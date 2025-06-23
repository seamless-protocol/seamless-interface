import { FetchData, SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import morphoIcon from "@assets/tokens/morpho.svg";
import { useMutateClaimAllMorphoRewards } from "../../../../../../data/morpho/user-distributions/useMutateClaimAllMorphoRewards";
import { useAccount } from "wagmi";
import {
  useMorphoExtendedUserRewards,
  MorphoUserRewardsData,
} from "../../../../../../data/morpho/user-rewards/MorphoUserRewards.hook";

const config = {
  id: "2",
  icon: morphoIcon,
  name: "Vaults Rewards",
  description: "",
};

export const useMorphoRewardsWrapper = ({
  settings,
}: {
  settings: SeamlessWriteAsyncParams;
}): FetchData<RewardItem> => {
  const { address } = useAccount();
  const { claimAllAsync, isClaiming } = useMutateClaimAllMorphoRewards({ ...settings });

  const { data, ...rest } = useMorphoExtendedUserRewards(address);
  const rewardData = data || ({} as MorphoUserRewardsData);
  const rewards = rewardData.rewards?.map((reward) => ({
    tokenAmount: reward.formatted.claimableNow,
    dollarAmount: reward.formatted.claimableNowUsd,
    logo: reward.token.logo || "",
    address: reward.asset.address,
  }));

  return {
    ...rest,
    data: {
      ...config,
      claimAllAsync,
      isClaiming,
      rewards: rewards || [],
    },
  };
};
