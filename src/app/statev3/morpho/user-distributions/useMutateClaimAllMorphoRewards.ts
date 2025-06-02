import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { fetchMorphoUserDistributions } from "./MorphoUserDistributions.fetch";
import { useAccount } from "wagmi";
import { BundlerAction } from "@morpho-org/bundler-sdk-viem/lib/BundlerAction";
import { Address, encodeFunctionData } from "viem";
import { getFetchRawMorphoUserRewardsQueryKey } from "../user-rewards/MorphoUserRewards.fetch";
import { baseBundlerAbi } from "../../../../../abis/urdBundler";
import { ChainId, getChainAddresses as getMorphoChainAddresses } from "@morpho-org/blue-sdk";
import { targetChain } from "../../../config/rainbow.config";

export const useMutateClaimAllMorphoRewards = (settings?: SeamlessWriteAsyncParams) => {
  const { address } = useAccount();

  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);
  const { showNotification } = useNotificationContext();

  // hook call
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    ...settings,
    queriesToInvalidate: [getFetchRawMorphoUserRewardsQueryKey(address)],
  });

  // mutation wrapper
  const claimAllAsync = async () => {
    let txHash;
    try {
      if (!address) throw new Error("Account address is not found. Please connect your wallet.");

      const distributions = await fetchMorphoUserDistributions(address);
      const actions = distributions.data.map((item) =>
        BundlerAction.urdClaim(
          item.distributor.address,
          address,
          item.asset.address,
          BigInt(item.claimable),
          item.proof as Address[],
          false
        )
      );
      if (!actions || actions.length === 0) throw new Error("No rewards to claim");

      const data = encodeFunctionData({
        abi: baseBundlerAbi,
        functionName: "multicall",
        args: [actions] as any,
      });

      txHash = await sendTransactionAsync({
        to: bundler,
        data,
        chainId: targetChain.id,
      });
    } catch (error) {
      console.error("Failed to claim all rewards", error);
      showNotification({ status: "error", content: `Failed to claim all rewards: ${getParsedError(error)}` });
    }

    return txHash;
  };

  return { claimAllAsync, isClaiming: rest.isPending, ...rest };
};
