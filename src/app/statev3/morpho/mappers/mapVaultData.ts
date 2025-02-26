import { formatFetchBigIntToViewBigInt, formatToDisplayable, Token } from "@shared";
import { FullVaultInfoQuery } from "@generated-graphql";
import { vaultConfig } from "../../settings/config";
import { MappedVaultData } from "../types/MappedFullVaultData";
import { fNetApyData } from "./mapNetApyData/fNetApyData";

function convertSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return minutes === 0 ? `${hours}h` : `${hours}h${minutes}m`;
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
    netApyData: fNetApyData(state),
  };
}
