import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import fuulIcon from "@assets/logos/logo-fuul.svg";
import { useMutateClaimFuulRewards } from "../../../../../../statev3/fuul/mutations/useMutateClaimFuulRewards";

const config = {
  id: "3",
  icon: fuulIcon,
  name: "Fuul rewards",
  description: "Fuul rewards",
};

export const useFuulRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimFuulRewardsAsync, isClaiming } = useMutateClaimFuulRewards({ ...settings });

  return {
    ...config,
    claimAllAsync: claimFuulRewardsAsync,
    isClaiming,
    rewards: [],
  };
};
