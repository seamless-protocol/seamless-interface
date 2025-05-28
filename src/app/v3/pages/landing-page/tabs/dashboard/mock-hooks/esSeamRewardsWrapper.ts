import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import seamIcon from "@assets/tokens/seam.svg";
import { useMutateClaimVestedEsSEAM } from "../../../../../../statev3/governance/mutations/useMutateClaimVestedEsSEAM";

const config = {
  id: "4",
  icon: seamIcon,
  name: "esSEAM rewards",
  description: "Vested esSEAM rewards",
};

export const useEsSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM(settings);

  return {
    ...config,
    claimAllAsync: claimVestedAsync,
    isClaiming: isClaimVestedPending,
    rewards: [],
  };
};
