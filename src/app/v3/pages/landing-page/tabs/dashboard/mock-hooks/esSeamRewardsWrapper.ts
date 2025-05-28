import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

// todo vestedSeam icon? is icon correct on figma actually?
import vestedSeam from "@assets/tokens/vestedSeam.svg";
import { useFetchViewAllUserRewards } from "../../../../../../statev3/common/hooks/useFetchViewAllUserRewards";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";

const config = {
  id: "4",
  icon: vestedSeam,
  name: "esSEAM rewards",
  description: "Vested esSEAM rewards",
};

export const useEsSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimAllAsync, isClaimAllPending } = useMutateClaimAllRewards(settings);
  const { data: rewardsData } = useFetchViewAllUserRewards();

  return {
    ...config,
    claimAllAsync,
    isClaiming: isClaimAllPending,
    rewards: rewardsData?.rewards || [],
  };
};
