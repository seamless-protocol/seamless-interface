import { ERC20Data } from "./ERC20";

/**
 * Data for an ERC4626 vault.
 *
 * This interface extends the ERC20Data interface with additional properties specific to an ERC4626 vault.
 *
 * @property {string} [asset] - The underlying asset address that the vault holds.
 *                              Fetched from the vault's `asset()` function.
 * @property {bigint} [totalAssets] - The total amount of the underlying asset held by the vault.
 *                                    Fetched from the vault's `totalAssets()` view function.
 */
export interface ERC4626Data extends ERC20Data {
  asset?: string;
  totalAssets?: bigint;
}
