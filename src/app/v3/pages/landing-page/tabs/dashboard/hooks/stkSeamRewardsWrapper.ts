import { FetchData, SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import seamIcon from "@assets/tokens/seam.svg";
import { useMutateClaimAllRewards } from "../../../../../../data/safetyModule/mutations/useMutateClaimAllRewards";
import { useFetchViewAllUserRewards } from "../../../../../../data/common/hooks/useFetchViewAllUserRewards";
import { rewardsAccruingAssets } from "../../../../../../data/settings/config";

const config = {
  id: "1",
  icon: seamIcon,
  name: "stkSEAM Rewards",
  description: "",
};

export const useStkSeamRewardsWrapper = ({
  settings,
}: {
  settings: SeamlessWriteAsyncParams;
}): FetchData<RewardItem> => {
  const { claimAllAsync, isClaimAllPending } = useMutateClaimAllRewards({ ...settings });
  const { data, ...rest } = useFetchViewAllUserRewards(rewardsAccruingAssets);

  return {
    ...rest,
    data: {
      ...config,
      claimAllAsync,
      isClaiming: isClaimAllPending,
      rewards: data?.rewards || [],
    },
  };
};
