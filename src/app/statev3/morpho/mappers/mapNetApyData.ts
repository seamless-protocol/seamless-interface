import { FullVaultInfoQuery } from "../../../../generated-graphql";
import { formatFetchNumberToViewNumber } from "../../../../shared";
import { ViewRewardToken } from "../../../v3/components/tooltip/IncentivesDetailCard";
import { NetApyData } from "../types/UserReward";
import chartIcon from "@assets/common/chart.svg";

export function getViewFormattedNetApyData(
  netApyData?: NetApyData
): { rewardsOnly: ViewRewardToken[]; rewardsWithRest: ViewRewardToken[] } {
  if (!netApyData) {
    return { rewardsOnly: [], rewardsWithRest: [] };
  }

  const rewardsOnly: ViewRewardToken[] =
    netApyData.rewards?.map((reward) => ({
      symbol: reward.asset?.symbol || "Unknown",
      logo: reward.asset?.logoURI ?? "",
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

export function getNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]): NetApyData | undefined {
  if (!vaultState) return undefined;

  const rewardsMap = new Map<
    string,
    {
      asset: any;
      totalApr: number;
    }
  >();

  const { totalAssets, netApy } = vaultState;
  if (totalAssets == null) throw new Error("totalAssetsUsd is undefined");
  if (netApy == null) throw new Error("netApy is undefined");

  let totalRewards = 0;

  // Process vault-level rewards
  if (vaultState.rewards) {
    for (const reward of vaultState.rewards) {
      const key = reward.asset.address;
      const apr = reward.supplyApr || 0;
      rewardsMap.set(key, {
        asset: reward.asset,
        totalApr: apr,
      });
      totalRewards += apr;
    }
  }

  // Process market-level rewards using the formula:
  // RewardsAPY = (RewardsMarketA * AssetsAllocatedInMarketA + RewardsMarketB * AssetsAllocatedInMarketB + ...) / TotalAssetsAllocated
  if (vaultState.allocation) {
    for (const allocation of vaultState.allocation) {
      const { market } = allocation;
      const supplyAssets = allocation.supplyAssets || 0;

      if (supplyAssets <= 0 || !market.state?.rewards) continue;

      for (const reward of market.state.rewards) {
        const key = reward.asset.address;
        if (reward.supplyApr == null) throw new Error("reward.supplyApr is null");

        // Calculate weighted APR contribution for this market
        const aprContribution = (reward.supplyApr * supplyAssets) / totalAssets;

        if (rewardsMap.has(key)) {
          rewardsMap.get(key)!.totalApr += aprContribution;
        } else {
          rewardsMap.set(key, {
            asset: reward.asset,
            totalApr: aprContribution,
          });
        }
        totalRewards += aprContribution;
      }
    }
  }

  // Calculate rest and net APY
  const restValue = netApy - totalRewards;
  if (restValue < 0) throw new Error("getNetApyData: restValue is negative");

  return {
    netApy: formatFetchNumberToViewNumber({
      value: netApy * 100,
      symbol: "%",
    }),
    rest: formatFetchNumberToViewNumber({
      value: restValue * 100,
      symbol: "%",
    }),
    rewards: Array.from(rewardsMap.values()).map((reward) => ({
      asset: reward.asset,
      totalAprPercent: formatFetchNumberToViewNumber({
        value: reward.totalApr * 100,
        symbol: "%",
      }),
    })),
  };
}