import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { fetchGetAllUserRewardsHookQK, fetchGetAllUserRewardsQueryOptions } from "../hooks/useFetchViewAllRewards";
import { safetyModuleRewardController } from "@meta";
import { rewardsControllerAbi } from "../../../generated";
import { useAccount } from "wagmi";
import { rewardsAccruingAssets } from "../../settings/config";

export const useMutateClaimAllRewards = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [
      fetchGetAllUserRewardsHookQK(address),
      fetchGetAllUserRewardsQueryOptions(address, rewardsAccruingAssets).queryKey,
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    try {
      await writeContractAsync(
        {
          address: safetyModuleRewardController,
          abi: rewardsControllerAbi,
          functionName: "claimAllRewardsToSelf",
          args: [rewardsAccruingAssets],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to claim rewards", error);
      showNotification({
        status: "error",
        content: `Failed to claim rewards: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
