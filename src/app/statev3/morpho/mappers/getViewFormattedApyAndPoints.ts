import { ViewNumber } from "@shared";
import { ViewRewardToken } from "../../../v3/components/tooltip/IncentivesDetailCard";
import { NetApyData } from "../types/UserReward";

import chartIcon from "@assets/common/chart.svg";
import placeholderIcon from "@assets/logos/placeholder.svg";
import { Address } from "viem";
import { vaultConfig } from "../../settings/config";

export function getViewFormattedApyAndPoints(
  netApyData: NetApyData,
  vaultAddress?: Address
): {
  rewardsOnly: ViewRewardToken[];
  rewardsWithNativeApyAndPoints: ViewRewardToken[];
} {
  const config = vaultAddress ? vaultConfig[vaultAddress] : undefined;

  const rewardsOnly: ViewRewardToken[] =
    netApyData.rewards?.map((reward) => ({
      symbol: reward.asset?.symbol || "Unknown",
      logo: reward.asset?.logoURI || placeholderIcon,
      apr: reward.totalAprPercent,
      type: "APY",
    })) || [];

  const rewardsWithNativeApyAndPoints: ViewRewardToken[] = [
    {
      symbol: "Native APY",
      apr: netApyData?.nativeAPY,
      logo: chartIcon,
      type: "APY",
    },
    ...rewardsOnly,
  ];

  const finalRewardsWithNativeApyAndPoints = config?.pointsProgram
    ? [
        ...rewardsWithNativeApyAndPoints,
        {
          symbol: config.pointsProgram.symbol,
          apr: {
            viewValue: config.pointsProgram.viewValue,
          } as ViewNumber,
          logo: config.pointsProgram.icon,
          type: "Points",
        } as ViewRewardToken,
      ]
    : rewardsWithNativeApyAndPoints;

  return { rewardsOnly, rewardsWithNativeApyAndPoints: finalRewardsWithNativeApyAndPoints };
}
