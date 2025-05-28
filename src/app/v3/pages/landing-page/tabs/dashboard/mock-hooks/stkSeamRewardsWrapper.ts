import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import seamIcon from "@assets/tokens/seam.svg";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";
import { useFetchViewAllUserRewards } from "../../../../../../statev3/common/hooks/useFetchViewAllUserRewards";
import { rewardsAccruingAssets } from "../../../../../../statev3/settings/config";

const config = {
  id: "1",
  icon: seamIcon,
  name: "stSEAM rewards",
  description: "stSEAM rewards",
};

export const useStkSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimAllAsync, isClaimAllPending } = useMutateClaimAllRewards({ ...settings });
  const { data } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  return {
    ...config,
    claimAllAsync,
    isClaiming: isClaimAllPending,
    rewards: data?.rewards || [],
  };
};
