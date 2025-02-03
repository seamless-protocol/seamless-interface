import { Token, ViewBigInt } from "@shared";
import { MorphoAsset } from "./MorphoAsset";
import { Curator } from "./Curator";
import { NetApyData, VaultStateReward } from "./UserReward";




export interface MappedVaultData {
  /**
   * The net APY data, if available.
   */
  netApyData?: NetApyData;
  /**
   * The token data associated with the vault.
   */
  vaultTokenData: Token;
  /**
   * The address of the vault.
   * todo fix any in mapper
   */
  vaultAddress: any;

  /**
   * The name of the vault. Defaults to "Unknown Vault" if not provided.
   */
  name: string;

  /**
   * The description of the vault.
   */
  description?: string;

  /**
   * The underlying token associated with the vault.
   * todo remove to underylingAsset
   */
  asset: MorphoAsset;

  /**
   * The total supply of the vault, formatted for display.
   */
  totalSupply: ViewBigInt;

  /**
   * The total assets of the vault, formatted for display.
   */
  totalAssets: ViewBigInt;

  /**
   * The total assets in USD, formatted for display.
   */
  totalAssetsUsd: string;

  /**
   * The net APY (Annual Percentage Yield), formatted as a percentage string.
   */
  netApy: string;

  /**
   * The curator of the vault. Currently hardcoded as "test".
   */
  curator?: Curator;

  /**
   * The fee percentage, formatted as a percentage string.
   */
  feePercentage: string;

  /**
   * An array of collateral asset logo URIs.
   */
  collateralLogos: string[];

  /**
   * The timelock duration in seconds.
   */
  timelock?: string;

  rewards?: VaultStateReward[];
}
