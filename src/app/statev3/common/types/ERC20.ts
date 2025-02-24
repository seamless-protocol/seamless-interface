/**
 * Data for a standard ERC20 token.
 *
 * These properties are typically fetched directly from the token contract using view functions.
 *
 * @property {number} [decimals] - The number of decimals used for display purposes.
 *                                 Fetched from the contract's `decimals()` view function.
 * @property {string} [name] - The token name (e.g., "My Token").
 *                             Fetched from the contract's `name()` view function.
 * @property {string} [symbol] - The token symbol (e.g., "MTK").
 *                               Fetched from the contract's `symbol()` view function.
 * @property {bigint} [totalSupply] - The total supply of the token.
 *                                    Fetched from the contract's `totalSupply()` view function.
 */
export interface ERC20Data {
  decimals?: number;
  name?: string;
  symbol?: string;
  totalSupply?: bigint;
  allowance?: bigint;
  balance?: bigint;
}
