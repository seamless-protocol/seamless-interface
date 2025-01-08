import { Token, ViewBigInt } from "@shared";

export interface SimpleVaultData {
  vaultAddress: string;
  totalAssetsUsd: ViewBigInt;
  name: string;
  underlyingTokenData: Token;
  totalSupply: bigint;
  totalSupplyFormatted: ViewBigInt;
  netApy: bigint;
  netApyFormatted: string;
  curator: string;
  feePercentage: string;
  collateralLogos: string[]; // Array of collateral logos
  timelock: bigint | string;
  timelockFormatted: string;
}
