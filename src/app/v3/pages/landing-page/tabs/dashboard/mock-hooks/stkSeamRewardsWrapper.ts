import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import fuulIcon from "@assets/logos/logo-fuul.svg";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";

const config = {
  id: "1",
  icon: fuulIcon,
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
