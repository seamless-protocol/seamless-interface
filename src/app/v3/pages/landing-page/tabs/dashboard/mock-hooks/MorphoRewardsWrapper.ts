import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import morphoIcon from "@assets/tokens/morpho.svg";
import { useMutateClaimAllMorphoRewards } from "../../../../../../statev3/morpho/user-distributions/useMutateClaimAllMorphoRewards";

const config = {
  id: "2",
  icon: morphoIcon,
  name: "Morpho rewards",
  description: "Morpho rewards",
};

export const useMorphoRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimAllAsync, isClaiming } = useMutateClaimAllMorphoRewards({ ...settings });

  return {
    ...config,
    claimAllAsync,
    isClaiming,
    rewards: [],
  };
};
