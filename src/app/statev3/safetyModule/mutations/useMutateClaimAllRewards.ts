import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { Address } from "viem";
import { safetyModuleRewardController, rewardsControllerAbi, stakedSeamAddress } from "@generated";
import { useFetchViewAllUserRewards } from "../hooks/useFetchViewAllRewards";

export const useMutateClaimAllRewards = () => {
  const rewardsAccruingAssets: Address[] = [stakedSeamAddress];

  // cache data
  const { queryKey: allUsersRewardsQK } = useFetchViewAllUserRewards();

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [allUsersRewardsQK],
  });

  // mutation wrapper
  const claimAllAsync = async (settings?: SeamlessWriteAsyncParams) => {

    await writeContractAsync(
      {
        address: safetyModuleRewardController,
        abi: rewardsControllerAbi,
        functionName: "claimAllRewardsToSelf",
        args: [rewardsAccruingAssets],
      },
      { ...settings }
    );
  };

  return { ...rest, isClaimAllPending: rest.isPending, claimAllAsync };
};
