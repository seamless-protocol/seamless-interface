import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { Address } from "viem";
import { STAKED_SEAM_ADDRESS, safetyModuleRewardController } from "@meta";
import { rewardsControllerAbi } from "../../../generated";
import { useFetchViewAllUserRewards } from "../../common/hooks/useFetchViewAllRewards";

export const useMutateClaimAllRewards = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();

  const rewardsAccruingAssets: Address[] = [STAKED_SEAM_ADDRESS];

  /* ------------ */
  /*   Query keys */
  /* ------------ */
  const { queryKey: allUsersRewardsQK } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [allUsersRewardsQK],
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
