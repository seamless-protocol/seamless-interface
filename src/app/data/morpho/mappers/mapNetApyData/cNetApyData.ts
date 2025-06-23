import { FullVaultInfoQuery } from "../../../../../generated-graphql";

export function cNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]) {
  if (!vaultState) return undefined;

  const rewardsMap = new Map<
    string,
    {
      asset: any;
      totalApr: number;
    }
  >();

  const { totalAssets, netApy } = vaultState;
  if (totalAssets == null) throw new Error("totalAssets is undefined");
  if (netApy == null) throw new Error("netApy is undefined");

  let totalRewards = 0;

  // Process vault-level rewards
  if (vaultState.rewards) {
    for (const reward of vaultState.rewards) {
      const key = reward.asset.address;
      const apr = reward.supplyApr;
      if (apr == null) {
        console.error("reward.supplyApr is null", reward);
        throw new Error("reward.supplyApr is null");
      }

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
      const { supplyAssets } = allocation;
      if (supplyAssets == null) {
        console.error("supplyAssets is null", allocation);
        throw new Error("supplyAssets is null");
      }

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
  const nativeAPYValue = netApy - totalRewards;

  return {
    netApy: netApy * 100,
    nativeAPY: nativeAPYValue * 100,
    rewards: Array.from(rewardsMap.values()).map((reward) => ({
      asset: reward.asset,
      totalApr: reward.totalApr * 100,
    })),
  };
}
