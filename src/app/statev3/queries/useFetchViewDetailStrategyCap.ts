import { Address } from "viem";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { config } from "../../config/rainbow.config";
import { loopStrategyAbi } from "../../generated";
import { fetchStrategyAssets } from "../metadata/useFetchStrategyAssets";
import { fetchAssetPriceInBlock } from "../../state/common/queries/useFetchViewAssetPrice";
import { cValueInUsd } from "../../state/common/math/cValueInUsd";
import { fetchTokenData } from "../metadata/useFetchTokenData";
import {
  Displayable,
  ViewBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  formatFetchBigIntToViewBigIntTemp,
} from "../../../shared";
import { useQuery } from "@tanstack/react-query";

export async function fetchDetailStrategyCap(strategy: Address) {
  const { underlying: underlyingAsset } = await fetchStrategyAssets(strategy);

  if (!underlyingAsset) throw new Error("Underlying asset not found");

  const { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals } = await fetchTokenData(underlyingAsset);

  const price = await fetchAssetPriceInBlock(config, underlyingAsset);

  const assetCap = await queryContract(
    queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getAssetsCap",
    })
  );

  return {
    tokenAmount: fFetchBigIntStructured(assetCap, underlyingAssetDecimals, underlyingAssetSymbol),
    dollarAmount: fUsdValueStructured(cValueInUsd(assetCap, price, underlyingAssetDecimals)),
  };
}

export const useFetchDetailStrategyCap = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailStrategyCap", strategy],
    queryFn: () => fetchDetailStrategyCap(strategy!),
    enabled: !!strategy,
  });
};

interface ViewAssetCap {
  tokenAmount: ViewBigInt | undefined;
  dollarAmount: ViewBigInt | undefined;
}

export const useFetchViewDetailStrategyCap = (strategy: Address | undefined): Displayable<ViewAssetCap> => {
  const { data, ...rest } = useFetchDetailStrategyCap(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(data?.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(data?.dollarAmount),
    },
  };
};
