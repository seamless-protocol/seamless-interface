import { Address } from "viem";
import { getBlock } from "wagmi/actions";
import { getConfig } from "../../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "../../common/queries/AssetPrice.hook";
import { APY_BLOCK_FRAME, PERCENTAGE_VALUE_DECIMALS, USD_VALUE_DECIMALS } from "@meta";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import {
  Displayable,
  FetchBigIntStrict,
  ViewBigInt,
  formatFetchBigInt,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { cValueFromUsd } from "../../common/math/utils";

interface cStrategyReturnInput {
  currStrategyPrice: bigint;
  prevStrategyPrice: bigint;
  currDebtAssetPrice: bigint;
  prevDebtAssetPrice: bigint;
}

export function cStrategyReturn(input: cStrategyReturnInput): FetchBigIntStrict {
  const { currStrategyPrice, prevStrategyPrice, currDebtAssetPrice, prevDebtAssetPrice } = input;

  const currStrategyPriceInDebAsset = cValueFromUsd(currStrategyPrice, currDebtAssetPrice, USD_VALUE_DECIMALS);
  const prevStrategyPriceInDebAsset = cValueFromUsd(prevStrategyPrice, prevDebtAssetPrice, USD_VALUE_DECIMALS);

  const strategyReturn =
    ((currStrategyPriceInDebAsset - prevStrategyPriceInDebAsset) * 10000n) / prevStrategyPriceInDebAsset;

  return formatFetchBigInt(strategyReturn, PERCENTAGE_VALUE_DECIMALS, "%");
}

export async function fetchStrategyHistoricReturn(strategy: Address): Promise<FetchBigIntStrict> {
  const [{ debt: debtAsset }, latestBlock] = await Promise.all([fetchStrategyAssets(strategy), getBlock(getConfig())]);

  const [currStrategyPrice, prevStrategyPrice, currDebtAssetPrice, prevDebtAssetPrice] = await Promise.all([
    fetchAssetPriceInBlock(strategy, latestBlock.number),
    fetchAssetPriceInBlock(strategy, latestBlock.number - APY_BLOCK_FRAME),
    fetchAssetPriceInBlock(debtAsset, latestBlock.number),
    fetchAssetPriceInBlock(debtAsset, latestBlock.number - APY_BLOCK_FRAME),
  ]);

  return cStrategyReturn({
    currStrategyPrice: currStrategyPrice.bigIntValue,
    prevStrategyPrice: prevStrategyPrice.bigIntValue,
    currDebtAssetPrice: currDebtAssetPrice.bigIntValue,
    prevDebtAssetPrice: prevDebtAssetPrice.bigIntValue,
  });
}

export const useFetchFormattedStrategyHistoricReturn = (strategy?: Address): Displayable<ViewBigInt> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFormattedStrategyHistoricReturn", strategy],
    queryFn: () => fetchStrategyHistoricReturn(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(data),
  };
};
