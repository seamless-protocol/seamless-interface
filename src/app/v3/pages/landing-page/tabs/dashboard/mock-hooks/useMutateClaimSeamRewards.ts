import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import seamIcon from "@assets/tokens/seam.svg";
import { useMutateClaimVestedEsSEAM } from "../../../../../../statev3/governance/mutations/useMutateClaimVestedEsSEAM";

const config = {
  id: "1",
  icon: seamIcon,
  name: "stkSEAM rewards",
  description: "Staking rewards and fees",
};

export const useMutateClaimSeamRewards = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM(settings);

  return {
    ...config,
    claimAllAsync: claimVestedAsync,
    isClaiming: isClaimVestedPending,
    rewards: [],
  };
};
