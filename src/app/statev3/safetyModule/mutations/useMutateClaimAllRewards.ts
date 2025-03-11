import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { Address } from "viem";
import { useFetchViewAllUserRewards } from "../hooks/useFetchViewAllRewards";
import { stakedSeamAddress, safetyModuleRewardController } from "@meta";
import { rewardsControllerAbi } from "../../../generated";

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
