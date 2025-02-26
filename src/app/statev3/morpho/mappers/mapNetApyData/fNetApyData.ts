import { FullVaultInfoQuery } from "../../../../../generated-graphql";
import { formatFetchNumberToViewNumber, ViewNumber } from "@shared";
import { ViewRewardToken } from "../../../../v3/components/tooltip/IncentivesDetailCard";
import { NetApyData } from "../../types/UserReward";
import { cNetApyData } from "./cNetApyData";

import chartIcon from "@assets/common/chart.svg";
import placeholderIcon from "@assets/logos/placeholder.svg";
import { Address } from "viem";
import { vaultConfig } from "../../../settings/config";

export function getViewFormattedNetApyData(
  netApyData: NetApyData,
  vaultAddress?: Address
): {
  rewardsOnly: ViewRewardToken[];
  rewardsWithNativeApy: ViewRewardToken[];
} {
  const config = vaultAddress ? vaultConfig[vaultAddress] : undefined;

  const rewardsOnly: ViewRewardToken[] =
    netApyData.rewards?.map((reward) => ({
      symbol: reward.asset?.symbol || "Unknown",
      logo: reward.asset?.logoURI || placeholderIcon,
      apr: reward.totalAprPercent,
    })) || [];

  const rewardsWithNativeApy: ViewRewardToken[] = [
    {
      symbol: "Native APY",
      apr: netApyData?.nativeAPY,
      logo: chartIcon,
    },
    ...rewardsOnly,
  ];

  const finalRewardsWithNativeApy = config?.pointsProgram
    ? [
        ...rewardsWithNativeApy,
        {
          symbol: config.pointsProgram.symbol,
          apr: {
            viewValue: config.pointsProgram.viewValue,
            symbol: "",
          } as ViewNumber,
          logo: config.pointsProgram.icon,
          isNotAPR: true,
        } as ViewRewardToken,
      ]
    : rewardsWithNativeApy;

  return { rewardsOnly, rewardsWithNativeApy: finalRewardsWithNativeApy };
}

export function fNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]): NetApyData | undefined {
  const calculated = cNetApyData(vaultState);
  if (!calculated) return undefined;

  return {
    netApy: formatFetchNumberToViewNumber({
      value: calculated.netApy,
      symbol: "%",
    }),
    nativeAPY: formatFetchNumberToViewNumber({
      value: calculated.nativeAPY,
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
