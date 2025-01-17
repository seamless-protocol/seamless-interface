import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { fetchMorphoUserDistributions } from "./MorphoUserDistributions.fetch";
import { useAccount } from "wagmi";
import { BundlerAction } from "@morpho-org/morpho-blue-bundlers/pkg";
import { encodeFunctionData } from "viem";
import { MORPHO_USER_REWARDS_QUERY_KEY } from "../user-rewards/MorphoUserRewards.fetch";
import { baseBundlerAbi } from "../../../../../abis/urdBundler";
import {
  ChainId,
  getChainAddresses as getMorphoChainAddresses,
} from "@morpho-org/blue-sdk";

export const useMutateClaimAllMorphoRewards = () => {
  const { address } = useAccount();

  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);
  const { showNotification } = useNotificationContext();

  // hook call
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    queriesToInvalidate: [[MORPHO_USER_REWARDS_QUERY_KEY]],
    hideDefaultErrorOnNotification: true,
  });

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      if (!address) throw new Error("Account address is not found. Please connect your wallet.");

      const distributions = await fetchMorphoUserDistributions(address);
      const actions: BundlerAction[] = distributions.data.map((item) =>
        BundlerAction.urdClaim(
          item.distributor.address,
          address,
          item.asset.address,
          item.claimable,
          item.proof,
          false
        )
      )
      if (!actions || actions.length === 0) throw new Error("No rewards to claim");

      const data = encodeFunctionData({
        abi: baseBundlerAbi,
        functionName: "multicall",
        args: [actions] as any,
      });

      await sendTransactionAsync(
        {
          to: bundler,
          data,
        },
        { ...settings }
      );

    } catch (error) {
      console.error("Failed to claim all rewards", error);
      showNotification({ status: "error", content: `Failed to claim all rewards: ${getParsedError(error)}` });
    }
  };

  return { claimAllAsync, isClaiming: rest.isPending, ...rest };
};
