import { Address } from "viem";
import {
  Displayable,
  FetchTokenAmountWithUsdValueStrict,
  ViewBigIntWithUsdValue,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "@shared";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { loopStrategyAbi } from "../../generated";
import { cValueInUsd } from "../math/utils";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../state/settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

export async function fetchStrategyCap(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { underlying } = await fetchStrategyAssets(strategy);

  const [cap, underlyingAssetPrice, { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals }] =
    await Promise.all([
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: strategy,
          abi: loopStrategyAbi,
          functionName: "getAssetsCap",
        }),
        ...infiniteCacheQueryConfig,
      }),
      fetchAssetPriceInBlock(underlying),
      fetchTokenData(underlying),
    ]);

  return {
    tokenAmount: formatFetchBigInt(cap, underlyingAssetDecimals, underlyingAssetSymbol),
    dollarAmount: formatUsdValue(cValueInUsd(cap, underlyingAssetPrice.bigIntValue, underlyingAssetDecimals)),
  };
}

export const useFetchFormattedStrategyCap = (strategy?: Address): Displayable<ViewBigIntWithUsdValue> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFormattedStrategyCap", strategy],
    queryFn: () => fetchStrategyCap(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigInt(data?.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigInt(data?.dollarAmount),
    },
  };
};
