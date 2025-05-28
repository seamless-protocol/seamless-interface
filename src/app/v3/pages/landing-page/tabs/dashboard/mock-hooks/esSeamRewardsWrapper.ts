import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

// todo vestedSeam icon? is icon correct on figma actually?
import vestedSeam from "@assets/tokens/vestedSeam.svg";
import { useFetchViewAllUserRewards } from "../../../../../../state/lending-borrowing/hooks/useFetchViewAllRewards";
import { useMutateClaimVestedEsSEAM } from "../../../../../../statev3/governance/mutations/useMutateClaimVestedEsSEAM";

const config = {
  id: "4",
  icon: vestedSeam,
  name: "esSEAM rewards",
  description: "Vested esSEAM rewards",
};

export const useEsSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM(settings);
  const { data: rewardsData } = useFetchViewAllUserRewards();

  return {
    ...config,
    claimAllAsync: claimVestedAsync,
    isClaiming: isClaimVestedPending,
    rewards: rewardsData?.rewards || [],
  };
};
