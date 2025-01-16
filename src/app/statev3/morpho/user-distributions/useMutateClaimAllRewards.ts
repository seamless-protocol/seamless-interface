import { SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { fetchMorphoUserDistributions } from "./MorphoUserDistributions.fetch";
import { useAccount } from "wagmi";
import { BundlerAction } from "@morpho-org/morpho-blue-bundlers/pkg";
import { Address, encodeFunctionData } from "viem";
import { MORPHO_USER_REWARDS_QUERY_KEY } from "../user-rewards/MorphoUserRewards.fetch";

export const useMutateClaimAllRewards = () => {
  const { address } = useAccount();

  const { showNotification } = useNotificationContext();

  // hook call
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    queriesToInvalidate: [[MORPHO_USER_REWARDS_QUERY_KEY]],
  });

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      if (!address) throw new Error("Account address is not found. Please connect your wallet.");

      const inputData = await fetchMorphoUserDistributions(address);

      const claimAction = BundlerAction.urdClaim(
        inputData.distributor.address,
        address,
        "0x0000000000000000000000000000000000000000", // todo: reward?
        inputData.claimable,
        inputData.proof,
        false
      );

      const data = encodeFunctionData({
        abi: {} as any,
        functionName: "urdClaim",
        args: [[claimAction]],
      });

      await sendTransactionAsync(
        {
          to: inputData.distributor.address as Address,
          data,
        },
        { ...settings }
      );

      showNotification({ status: "success", content: "Claimed all rewards successfully!" });
    } catch (error) {
      console.error("Failed to claim all rewards", error);
      showNotification({ status: "error", content: "Failed to claim all rewards" });
    }
  };

  return { claimAllAsync, isClaiming: rest.isPending, ...rest };
};
