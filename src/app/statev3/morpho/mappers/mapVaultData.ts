import { formatFetchBigIntToViewBigInt, formatToDisplayable, Token } from "@shared";
import { FullVaultInfoQuery } from "@generated-graphql";
import { vaultConfig } from "../../settings/config";
import { MappedVaultData } from "../types/MappedFullVaultData";
import { NetApyData } from "../types/UserReward";

function convertSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return minutes === 0 ? `${hours}h` : `${hours}h${minutes}m`;
}

function getNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]): NetApyData | undefined {
  if (!vaultState) return undefined;

  const rewardsMap = new Map<
    string,
    {
      asset: any;
      totalApr: number;
    }
  >();

  const { totalAssetsUsd, netApy } = vaultState;
  if (totalAssetsUsd == null) throw new Error("totalAssetsUsd is undefined");
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
      const supplyAssetsUsd = allocation.supplyAssetsUsd || 0;

      if (supplyAssetsUsd <= 0 || !market.state?.rewards) continue;

      for (const reward of market.state.rewards) {
        const key = reward.asset.address;
        if (reward.supplyApr == null) throw new Error("reward.supplyApr is null");

        // Calculate weighted APR contribution for this market
        const aprContribution = (reward.supplyApr * supplyAssetsUsd) / totalAssetsUsd;

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
  if (restValue < 0) throw new Error("restValue is negative");

  return {
    netApy: formatToDisplayable(netApy * 100),
    rest: formatToDisplayable(restValue * 100),
    rewards: Array.from(rewardsMap.values()).map((reward) => ({
      asset: reward.asset,
      totalAprPercent: formatToDisplayable(reward.totalApr * 100),
    })),
  };
}

export function mapVaultData(vault: FullVaultInfoQuery["vaultByAddress"], vaultTokenData: Token): MappedVaultData {
  const config = vaultConfig[vault.address];
  const { address: vaultAddress, name, asset, state } = vault;
  const totalSupply = formatFetchBigIntToViewBigInt({
    bigIntValue: state?.totalSupply,
    decimals: vaultTokenData.decimals,
    symbol: asset.symbol,
  });
  const totalAssets = formatFetchBigIntToViewBigInt({
    bigIntValue: state?.totalAssets,
    decimals: asset.decimals,
    symbol: asset.symbol,
  });
  const totalAssetsUsd = formatToDisplayable(state?.totalAssetsUsd ?? 0);
  const netApy = formatToDisplayable((state?.netApy ?? 0) * 100);
  const curator = config?.curator; // state?.curator; TODO morpho: how to get name of curetor from adress?
  const feePercentage = formatToDisplayable((state?.fee ?? 0) * 100);
  const allocation = state?.allocation ?? [];
  const collateralLogos = allocation
    .map((alloc) => alloc.market.collateralAsset?.logoURI)
    .filter((logo) => logo != null);
  const timelock = state?.timelock ? `${convertSecondsToHours(Number(state?.timelock))} Hours` : "/";

  const netApyData = getNetApyData(state);
  console.log({ netApyData });

  return {
    vaultTokenData,
    vaultAddress,
    name: config?.name || name || "Unknown Vault",
    description: config?.description || asset.name || "",
    asset,
    totalSupply,
    totalAssets,
    totalAssetsUsd,
    netApy,
    curator,
    feePercentage,
    collateralLogos: (collateralLogos || []) as string[],
    timelock,
    rewards: vault.state?.rewards ? vault.state.rewards : undefined,
  };
}
