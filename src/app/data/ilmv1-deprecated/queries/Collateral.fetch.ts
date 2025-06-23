import { Address } from "viem";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { loopStrategyAbi } from "../../../generated";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { fetchToken, FetchTokenAmountWithUsdValueStrict, formatFetchBigInt, formatUsdValue } from "@shared";
import { cValueFromUsd } from "../../common/math/utils";
import { platformDataQueryConfig } from "../../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

export async function fetchCollateral(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { underlying: underlyingAsset } = await fetchStrategyAssets(strategy);

  const [collateralUsd, underlyingAssetPrice, { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals }] =
    await Promise.all([
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: strategy,
          abi: loopStrategyAbi,
          functionName: "collateralUSD",
        }),
        ...platformDataQueryConfig,
      }),
      fetchAssetPriceInBlock(underlyingAsset),
      fetchToken(underlyingAsset),
    ]);

  return {
    tokenAmount: formatFetchBigInt(
      cValueFromUsd(collateralUsd, underlyingAssetPrice.bigIntValue, underlyingAssetDecimals),
      underlyingAssetDecimals,
      underlyingAssetSymbol
    ),
    dollarAmount: formatUsdValue(collateralUsd),
  };
}
