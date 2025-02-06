import { FullVaultInfoQuery } from "../../../../../generated-graphql";
import { formatFetchNumberToViewNumber } from "@shared";
import { ViewRewardToken } from "../../../../v3/components/tooltip/IncentivesDetailCard";
import { NetApyData } from "../../types/UserReward";
import { cNetApyData } from "./cNetApyData";

import chartIcon from "@assets/common/chart.svg";
import placeholderIcon from "@assets/logos/placeholder.svg";

export function getViewFormattedNetApyData(netApyData: NetApyData): {
  rewardsOnly: ViewRewardToken[];
  rewardsWithRest: ViewRewardToken[];
} {
  const rewardsOnly: ViewRewardToken[] =
    netApyData.rewards?.map((reward) => ({
      symbol: reward.asset?.symbol || "Unknown",
      logo: reward.asset?.logoURI || placeholderIcon,
      apr: reward.totalAprPercent,
    })) || [];

  const rewardsWithRest: ViewRewardToken[] = [
    {
      symbol: "Rate",
      apr: netApyData?.rest,
      logo: chartIcon,
    },
    ...rewardsOnly,
  ];

  return { rewardsOnly, rewardsWithRest };
}

export function fNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]): NetApyData | undefined {
  const calculated = cNetApyData(vaultState);
  if (!calculated) return undefined;

  return {
    netApy: formatFetchNumberToViewNumber({
      value: calculated.netApy,
      symbol: "%",
    }),
    rest: formatFetchNumberToViewNumber({
      value: calculated.rest,
      symbol: "%",
    }),
    rewards: calculated.rewards.map((reward) => ({
      asset: reward.asset,
      totalAprPercent: formatFetchNumberToViewNumber({
        value: reward.totalApr,
        symbol: "%",
      }),
    })),
  };
}
