import { formatFetchBigIntToViewBigInt, formatToDisplayable, formatUnitsToNumber } from "@shared";
import { ExtendedAccrualVault } from "../types/ExtendedAccrualVault";
import { SimpleVaultData } from "../types/SimpleVaultData";

/**
 * Maps an ExtendedAccrualVault to a table-friendly data structure.
 *
 * @param vault - The ExtendedAccrualVault to be mapped.
 * @returns An object with formatted data suitable for table rendering.
 */
export function mapExtendedAccrualVaultToSimpleVaultData(vault: ExtendedAccrualVault): SimpleVaultData {
  const {
    address: vaultAddress,
    decimals,
    name,
    totalSupply,
    underlyingTokenData,
    netApy,
    apy,
    fee,
    allocations,
    timelock,
  } = vault;

  const curator = "test"; // TODO: Resolve curator name from address if applicable
  const timelockFormatted = String(timelock || 0); // TODO

  const totalAssetsUsd = formatFetchBigIntToViewBigInt({
    bigIntValue: 0n, // todo
    decimals,
    symbol: "$",
  });

  const totalSupplyFormatted = formatFetchBigIntToViewBigInt({
    bigIntValue: totalSupply,
    decimals,
    symbol: underlyingTokenData.symbol,
  });

  console.log({ vault });
  console.log({ vaultAddress });
  console.log({ netApy });
  console.log({ apy });
  console.log({ underlyingTokenData });
  console.log({ totalSupplyFormatted });
  const netApyFormatted = formatToDisplayable(formatUnitsToNumber(netApy, decimals - 2));

  const feePercentage = formatToDisplayable(formatUnitsToNumber(fee, decimals - 2));

  // ✅ Normalize addresses to lowercase before using `.get()` on the Map
  const collateralLogos = Array.from(allocations.values())
    .map((alloc) => alloc.position.market.params.collateralToken)
    .map((collateralToken) => vault.collateralTokenData.get(collateralToken)?.logo)
    .filter((logo): logo is string => !!logo);

  return {
    vaultAddress,
    totalAssetsUsd,
    name: name || "Unknown Vault",
    underlyingTokenData,
    totalSupply,
    totalSupplyFormatted,
    netApy,
    netApyFormatted,
    curator,
    feePercentage,
    collateralLogos,
    timelock,
    timelockFormatted,
  };
}
