import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { rewardsControllerConfig } from "@generated";
import { useFetchViewAllUserRewards } from "../../lending-borrowing/hooks/useFetchViewAllRewards";
import { BRETT_ADDRESS } from "../../../../meta";
import { ViewAllUserRewards } from "../../lending-borrowing/types/ViewAllUserRewards";
import { useFetchAllRewardsAccruingAssets } from "../../../statev3/common/hooks/useFetchAllRewardsAccruingAssets";

// TODO: Remove this dirty function once esSEAM is upgraded and works properly
function isBrettOnlyRewardToken(allUsersRewards: ViewAllUserRewards): boolean {
  return allUsersRewards.rewards?.length === 1 && allUsersRewards.rewards?.[0].tokenAmount.symbol === "BRETT";
}

export const useMutateClaimAllRewards = () => {
  const { data: allRewardsAccruingAssets } = useFetchAllRewardsAccruingAssets();

  // cache data
  const { data: allUsersRewards, queryKey: allUsersRewardsQK } = useFetchViewAllUserRewards();

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [allUsersRewardsQK],
  });

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    // TODO: Remove this dirty if statement once esSEAM is upgraded and works properly
    if (isBrettOnlyRewardToken(allUsersRewards)) {
      const brettRewardAmount = allUsersRewards.rewards?.[0].tokenAmount?.bigIntValue;

      await writeContractAsync(
        {
          ...rewardsControllerConfig,
          functionName: "claimRewardsToSelf",
          args: [allRewardsAccruingAssets!, brettRewardAmount!, BRETT_ADDRESS],
        },
        { ...settings }
      );
    }

    await writeContractAsync(
      {
        ...rewardsControllerConfig,
        functionName: "claimAllRewardsToSelf",
        args: [allRewardsAccruingAssets!],
      },
      { ...settings }
    );
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
