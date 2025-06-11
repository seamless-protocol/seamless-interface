// hooks/useMutateClaimFuulRewards.ts
import { useAccount } from "wagmi";
import { encodeFunctionData } from "viem";

import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { FUUL_MANAGER_ADDRESS } from "@meta";

import { targetChain } from "../../../config/rainbow.config";
import {
  fetchUserBalances,
  fetchUserBalancesQueryOptions,
} from "../queries/fetch-user-balances/FetchUserBalances.fetch";
import { FuulManagerAbi } from "../../../../../abis/FuulManager";

export const useMutateClaimFuulRewards = (settings?: SeamlessWriteAsyncParams) => {
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    ...settings,
    queriesToInvalidate: [
      fetchUserBalancesQueryOptions({
        where: {
          owner: address,
        },
      }).queryKey,
    ],
  });

  const claimFuulRewardsAsync = async () => {
    let txHash;
    try {
      if (!address) {
        throw new Error("Wallet not connected. Please connect your wallet and try again.");
      }

      // 1. fetch real-time availableToClaim balances from subgraph
      const { data: balances } = await fetchUserBalances({
        where: {
          owner_: {
            address: address.toLowerCase(),
          },
          project_: { deployedAddress: import.meta.env.VITE_FUUL_DEPLOYED_ADDRESS },
        },
      });
      if (!balances?.userBalances?.length) {
        throw new Error("No Fuul rewards balance found.");
      }

      // 2. build claimChecks array
      const claimChecks = balances?.userBalances
        .map((b) => ({
          projectAddress: b.project.deployedAddress,
          currency: b.currency,
          amount: b.availableToClaim,
          tokenIds: [],
          amounts: [],
        }))
        .filter((c) => BigInt(c.amount) > 0n);

      if (claimChecks.length === 0) {
        throw new Error("You have no rewards available to claim.");
      }

      // 3. encode ABI data for claim(claimChecks)
      const data = encodeFunctionData({
        abi: FuulManagerAbi,
        functionName: "claim",
        args: [claimChecks],
      });

      // 4. send tx to FuulManager
      txHash = await sendTransactionAsync({
        to: FUUL_MANAGER_ADDRESS,
        data,
        chainId: targetChain.id,
      });
    } catch (error) {
      console.error("Failed to claim Fuul rewards", error);
      showNotification({
        status: "error",
        content: `Failed to claim Fuul rewards: ${getParsedError(error)}`,
      });
    }

    return txHash;
  };

  return {
    claimFuulRewardsAsync,
    isClaiming: rest.isPending,
    ...rest,
  };
};
