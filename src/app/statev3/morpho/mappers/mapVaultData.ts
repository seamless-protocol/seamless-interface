import { formatFetchBigIntToViewBigInt, formatToDisplayable } from "@shared";
import { FullVaultInfoQuery } from "@generated-graphql";
import { getCuratorConfig } from "../../settings/config";

function convertSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return minutes === 0 ? `${hours}h` : `${hours}h${minutes}m`;
}

export function mapVaultData(vault: FullVaultInfoQuery["vaultByAddress"]) {
  const { address: vaultAddress, name, asset, state } = vault;
  const totalSupply = formatFetchBigIntToViewBigInt({
    bigIntValue: state?.totalSupply ?? 0n,
    decimals: 18, // TODO morpho: even usdc is 18, todo: Double check with morpho team
    symbol: asset.symbol,
  });
  const totalAssetsUsd = formatToDisplayable(state?.totalAssetsUsd ?? 0);
  const netApy = formatToDisplayable((state?.netApy ?? 0) * 100);
  const curator = getCuratorConfig(state?.curator); // state?.curator; TODO morpho: how to get name of curetor from adress?
  const feePercentage = formatToDisplayable((state?.fee ?? 0) * 100);
  const allocation = state?.allocation ?? [];
  const collateralLogos = allocation
    .map((alloc) => alloc.market.collateralAsset?.logoURI)
    .filter((logo) => logo != null);
  const timelock = state?.timelock ? `${convertSecondsToHours(Number(state?.timelock))} Hours` : "/";

  return {
    vaultAddress,
    name: name || "Unknown Vault",
    asset,
    totalSupply,
    totalAssetsUsd,
    netApy,
    curator,
    feePercentage,
    collateralLogos: (collateralLogos || []) as string[],
    timelock,
  };
}
