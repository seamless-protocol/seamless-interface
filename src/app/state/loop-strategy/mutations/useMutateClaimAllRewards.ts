import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { rewardsControllerConfig } from "@generated";
import { useFetchAllRewardsAccruingAssets } from "../../common/hooks/useFetchAllRewardsAccruingAssets";
import { useFetchViewAllUserRewards } from "../../lending-borrowing/hooks/useFetchViewAllRewards";

export const useMutateClaimAllRewards = () => {
  const { data: allRewardsAccruingAssets } = useFetchAllRewardsAccruingAssets();

  // cache data
  const { queryKey: allUsersRewardsQK } = useFetchViewAllUserRewards();

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [allUsersRewardsQK],
  });

  console.log("allRewardsAccruingAssets", allRewardsAccruingAssets);

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {
    if (!allRewardsAccruingAssets) {
      console.warn("allRewardsAccruingAssets is undefined at useMutateClaimAllRewards!");
      return;
    }

    await writeContractAsync(
      {
        ...rewardsControllerConfig,
        functionName: "claimAllRewardsToSelf",
        args: [allRewardsAccruingAssets],
      },
      { ...settings }
    );
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
