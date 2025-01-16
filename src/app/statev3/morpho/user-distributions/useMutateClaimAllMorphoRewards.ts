import { SeamlessWriteAsyncParams, useSeamlessSendTransaction } from "@shared";
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

  // hook call
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    queriesToInvalidate: [[MORPHO_USER_REWARDS_QUERY_KEY]],
  });

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      if (!address) throw new Error("Account address is not found. Please connect your wallet.");

      const distributions = await fetchMorphoUserDistributions(address);

      const actions: any = [];
      distributions.data.map((item) =>
        actions.push(
          BundlerAction.urdClaim(
            item.distributor.address,
            address,
            item.asset.address,
            item.claimable,
            item.proof,
            false // todo : doublecheck
          )
        )
      )

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
    }
  };

  return { claimAllAsync, isClaiming: rest.isPending, ...rest };
};
