import { FullVaultInfoQuery } from "../../../../../generated-graphql";
import { formatFetchNumberToViewNumber, ViewNumber } from "@shared";
import { ViewRewardToken } from "../../../../v3/components/tooltip/IncentivesDetailCard";
import { NetApyData } from "../../types/UserReward";
import { cNetApyData } from "./cNetApyData";

import chartIcon from "@assets/common/chart.svg";
import resolvIcon from "@assets/logos/resolv.svg";
import placeholderIcon from "@assets/logos/placeholder.svg";
import { Address } from "viem";
import { seamlessUSDCMorphoVault } from "../../../../../meta";

export function getViewFormattedNetApyData(
  netApyData: NetApyData,
  vaultAddress?: Address
): {
  rewardsOnly: ViewRewardToken[];
  rewardsWithNativeApy: ViewRewardToken[];
} {
  const rewardsOnly: ViewRewardToken[] =
    netApyData.rewards?.map((reward) => ({
      symbol: reward.asset?.symbol || "Unknown",
      logo: reward.asset?.logoURI || placeholderIcon,
      apr: reward.totalAprPercent,
    })) || [];

  const finalRewardsOnly =
    vaultAddress === seamlessUSDCMorphoVault
      ? [
          ...rewardsOnly,
          {
            symbol: "Resolv",
            apr: {
              viewValue: "5x",
              symbol: "Points",
            } as ViewNumber,
            logo: resolvIcon,
            isNotAPR: true,
          } as ViewRewardToken,
        ]
      : rewardsOnly;

  const rewardsWithNativeApy: ViewRewardToken[] = [
    {
      symbol: "Native APY",
      apr: netApyData?.nativeAPY,
      logo: chartIcon,
    },
    ...finalRewardsOnly,
  ];

  return { rewardsOnly: finalRewardsOnly, rewardsWithNativeApy };
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
