// fetchFormattedAssetBalanceUsdValue.ts
import { Address } from "viem";
import { formatUsdValue } from "@shared";
import { cValueInUsd } from "../../math/utils";
import { fetchAssetBalance } from "../AssetBalance.hook";
import { fetchAssetPriceInBlock } from "../AssetPrice.hook";

const FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY = ["FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY"];
export const getFormattedAssetBalanceUsdValueQueryKey = (userAddress?: Address, asset?: Address) => [
  FORMATTED_ASSET_BALANCE_USD_VALUE_QUERY_KEY,
  userAddress,
  asset,
];

/**
 * Parameters for fetching asset balance + USD value
 */
export interface AssetBalanceUsdValuePairInput {
  userAddress?: Address;
  asset?: Address;
  blockNumber?: bigint;
}

/**
 * Non-hook version of fetching an asset balance and its USD value.
 * Uses React Query's `fetchQuery` under the hood, but no React hooks.
 */
export async function fetchAssetBalanceUsdValue({ userAddress, asset, blockNumber }: AssetBalanceUsdValuePairInput) {
  if (!userAddress || !asset) {
    return undefined;
  }

  const [assetBalance, assetPrice] = await Promise.all([
    fetchAssetBalance({ account: userAddress, asset }),
    fetchAssetPriceInBlock(asset, blockNumber),
  ]);

  // 2) Convert the raw balance to a USD amount
  const usdValue = cValueInUsd(assetBalance.bigIntValue, assetPrice.bigIntValue, assetBalance.decimals);

  // 3) Return a nicely formatted object
  return {
    tokenAmount: assetBalance,
    dollarAmount: formatUsdValue(usdValue),
  };
}
