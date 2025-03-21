import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { safetyModuleRewardController } from "@meta";
import { rewardsControllerAbi } from "@generated";
import {
  fetchGetAllUserRewardsHookQK,
  fetchGetAllUserRewardsQueryOptions,
  useFetchViewAllUserRewards,
} from "../../common/hooks/useFetchViewAllRewards";
import { rewardsAccruingAssets } from "../../settings/config";
import { useAccount } from "wagmi";
import { fetchBalanceQueryOptions } from "../../common/queries/useFetchViewAssetBalance";

export const useMutateClaimAllRewards = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();
  const { address } = useAccount();

  /* ------------- */
  /*   Query keys  */
  /* ------------- */
  const { data: allUsersRewards } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [
      fetchGetAllUserRewardsHookQK(rewardsAccruingAssets, address),
      fetchGetAllUserRewardsQueryOptions(address!, rewardsAccruingAssets).queryKey,
      allUsersRewards?.rewards?.map((reward) => fetchBalanceQueryOptions(address!, reward.address).queryKey),
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
