import { Address, zeroAddress } from "viem";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { loopStrategyAbi } from "../../generated";
import {
  Displayable,
  FetchTokenAmountWithUsdValueStrict,
  ViewBigIntWithUsdValue,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "../../../shared";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "./AssetPrice.hook";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { cValueInUsd } from "../math/cValueInUsd";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";

export async function fetchAvailableStrategyCap(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { underlying: underlyingAsset } = await fetchStrategyAssets(strategy);

  const [
    availableStrategyCap,
    underlyingAssetPrice,
    { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
  ] = await Promise.all([
    queryContract(
      queryOptions({
        address: strategy,
        abi: loopStrategyAbi,
        functionName: "maxDeposit",
        args: [zeroAddress], // This parameter is not used in smart contract so passing zeroAddress is safe
      })
    ),
    fetchAssetPriceInBlock(underlyingAsset),
    fetchTokenData(underlyingAsset),
  ]);

  return {
    tokenAmount: formatFetchBigInt(availableStrategyCap, underlyingAssetDecimals, underlyingAssetSymbol),
    dollarAmount: formatUsdValue(
      cValueInUsd(availableStrategyCap, underlyingAssetPrice.bigIntValue, underlyingAssetDecimals)
    ),
  };
}

export const useFetchFormattedAvailableStrategyCap = (
  strategy: Address | undefined
): Displayable<ViewBigIntWithUsdValue> => {
  const { data, ...rest } = useQuery({
    queryKey: ["fetchFormattedStrategyCap", strategy],
    queryFn: () => fetchAvailableStrategyCap(strategy!),
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
