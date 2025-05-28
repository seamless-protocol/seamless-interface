import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import morphoIcon from "@assets/tokens/morpho.svg";
import { useMutateClaimAllMorphoRewards } from "../../../../../../statev3/morpho/user-distributions/useMutateClaimAllMorphoRewards";
import { useAccount } from "wagmi";
import {
  useMorphoExtendedUserRewards,
  MorphoUserRewardsData,
} from "../../../../../../statev3/morpho/user-rewards/MorphoUserRewards.hook";

const config = {
  id: "2",
  icon: morphoIcon,
  name: "Morpho rewards",
  description: "Morpho rewards",
};

export const useMorphoRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { address } = useAccount();
  const { claimAllAsync, isClaiming } = useMutateClaimAllMorphoRewards({ ...settings });

  const { data } = useMorphoExtendedUserRewards(address);
  const rewardData = data || ({} as MorphoUserRewardsData);
  const rewards = rewardData.rewards?.map((reward) => ({
    tokenAmount: reward.formatted.claimableNow,
    dollarAmount: reward.formatted.claimableNowUsd,
    logo: reward.token.logo || "",
    address: reward.asset.address,
  }));

  return {
    ...config,
    claimAllAsync,
    isClaiming,
    rewards: rewards || [],
  };
};
