import { Address, zeroAddress } from "viem";
import { loopStrategyAbi } from "../../../generated";
import {
  Displayable,
  FetchTokenAmountWithUsdValueStrict,
  ViewBigIntWithUsdValue,
  fetchToken,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "../../../../shared";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { cValueInUsd } from "../../common/math/utils";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../settings/queryConfig";
import { OVERFLOW_UNDERFLOW_REASON_MESSAGE } from "../../../../meta";
import { readContractQueryOptions } from "wagmi/query";

export async function fetchMaxDeposit(strategy: Address): Promise<bigint> {
  const maxDeposit = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "maxDeposit",
      args: [zeroAddress], // This parameter is not used in smart contract so passing zeroAddress is safe
    }),
    ...infiniteCacheQueryConfig,
  }).catch((error) => {
    if (error.cause.reason === OVERFLOW_UNDERFLOW_REASON_MESSAGE) {
      // eslint-disable-next-line no-console
      console.info(`Failed to fetch available strategy cap for strategy ${strategy}`, error);
      return 0n;
    }

    throw error;
  });

  return maxDeposit;
}

export async function fetchAvailableStrategyCap(strategy: Address): Promise<FetchTokenAmountWithUsdValueStrict> {
  const { underlying: underlyingAsset } = await fetchStrategyAssets(strategy);

  const [
    availableStrategyCap,
    underlyingAssetPrice,
    { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
  ] = await Promise.all([
    fetchMaxDeposit(strategy),
    fetchAssetPriceInBlock(underlyingAsset),
    fetchToken(underlyingAsset),
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
    queryKey: ["hookFormattedStrategyCap", strategy],
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
