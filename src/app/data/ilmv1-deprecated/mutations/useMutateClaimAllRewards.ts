import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { rewardsControllerConfig } from "@generated";
import { useFetchViewAllUserRewards } from "../../lending-deprecated/hooks/useFetchViewAllRewards";
import { BRETT_ADDRESS } from "../../../../meta";
import { ViewAllUserRewards } from "../../lending-deprecated/types/ViewAllUserRewards";
import { useFetchAllRewardsAccruingAssets } from "../../common/hooks/useFetchAllRewardsAccruingAssets";
import { targetChain } from "../../../config/rainbow.config";

// TODO: Remove this dirty function once esSEAM is upgraded and works properly
function isBrettOnlyRewardToken(allUsersRewards: ViewAllUserRewards): boolean {
  return allUsersRewards.rewards?.length === 1 && allUsersRewards.rewards?.[0].tokenAmount.symbol === "BRETT";
}

export const useMutateClaimAllRewards = (settings?: SeamlessWriteAsyncParams) => {
  const { data: allRewardsAccruingAssets } = useFetchAllRewardsAccruingAssets();

  // cache data
  const { data: allUsersRewards, queryKey: allUsersRewardsQK } = useFetchViewAllUserRewards();

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    ...settings,
    queriesToInvalidate: [allUsersRewardsQK],
  });

  // mutation wrapper
  const claimAllAsync = async () => {
    let txHash;
    // TODO: Remove this dirty if statement once esSEAM is upgraded and works properly
    if (isBrettOnlyRewardToken(allUsersRewards)) {
      const brettRewardAmount = allUsersRewards.rewards?.[0].tokenAmount?.bigIntValue;

      txHash = await writeContractAsync(
        {
          chainId: targetChain.id,
          ...rewardsControllerConfig,
          functionName: "claimRewardsToSelf",
          args: [allRewardsAccruingAssets!, brettRewardAmount!, BRETT_ADDRESS],
        },
        { ...settings }
      );
    }

    txHash = await writeContractAsync({
      chainId: targetChain.id,
      ...rewardsControllerConfig,
      functionName: "claimAllRewardsToSelf",
      args: [allRewardsAccruingAssets!],
    });

    return txHash;
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
