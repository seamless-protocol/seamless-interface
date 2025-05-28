import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import seamIcon from "@assets/tokens/seam.svg";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";

const config = {
  id: "1",
  icon: seamIcon,
  name: "stSEAM rewards",
  description: "stSEAM rewards",
};

export const useStkSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimAllAsync, isClaimAllPending } = useMutateClaimAllRewards({ ...settings });

  return {
    ...config,
    claimAllAsync,
    isClaiming: isClaimAllPending,
    rewards: [],
  };
};
