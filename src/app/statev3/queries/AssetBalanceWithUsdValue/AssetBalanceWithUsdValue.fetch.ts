// fetchFormattedAssetBalanceUsdValue.ts
import { Address } from "viem";
import { formatUsdValue } from "@shared";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { cValueInUsd } from "../../math/utils";
import { queryConfig } from "../../settings/queryConfig";
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
export async function fetchFormattedAssetBalanceUsdValue({ userAddress, asset }: AssetBalanceUsdValuePairInput) {
  const queryClient = getQueryClient();

  // Safety check: if either is missing, return early or handle as you wish
  if (!userAddress || !asset) {
    return undefined;
  }

  const result = await queryClient.fetchQuery({
    queryKey: getFormattedAssetBalanceUsdValueQueryKey(userAddress, asset),
    queryFn: async () => {
      // 1) Fetch the raw asset balance & asset price
      const [assetBalance, assetPrice] = await Promise.all([
        fetchAssetBalance({ account: userAddress, asset }),
        fetchAssetPriceInBlock(asset),
      ]);

      // 2) Convert the raw balance to a USD amount
      const usdValue = cValueInUsd(assetBalance.bigIntValue, assetPrice.bigIntValue, assetBalance.decimals);

      // 3) Return a nicely formatted object
      return {
        tokenAmount: assetBalance,
        dollarAmount: formatUsdValue(usdValue),
      };
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return result;
}
