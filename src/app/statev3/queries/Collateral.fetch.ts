import { Address } from "viem";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { loopStrategyAbi } from "../../generated";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { FetchTokenAmountWithUsdValueStrict, formatFetchBigInt, formatUsdValue } from "../../../shared";
import { cValueFromUsd } from "../math/utils";

export async function fetchCollateral(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { underlying: underlyingAsset } = await fetchStrategyAssets(strategy);

  const [collateralUsd, underlyingAssetPrice, { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals }] =
    await Promise.all([
      queryContract(
        queryOptions({
          address: strategy,
          abi: loopStrategyAbi,
          functionName: "collateralUSD",
        })
      ),
      fetchAssetPriceInBlock(underlyingAsset),
      fetchTokenData(underlyingAsset),
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
