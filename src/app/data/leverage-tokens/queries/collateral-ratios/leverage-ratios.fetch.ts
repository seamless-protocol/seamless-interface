import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { COLLATERAL_RATIO_DECIMALS } from "../../../../../meta";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

interface CollateralRatios {
  minLeverage: ViewBigInt;
  maxLeverage: ViewBigInt;
  targetLeverage: ViewBigInt;
}

export const getMinCollateralRatioQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getLeverageTokenMinCollateralRatio",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const getMaxCollateralRatioQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getLeverageTokenMaxCollateralRatio",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const getTargetCollateralRatioQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getLeverageTokenTargetCollateralRatio",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const cCollateralRatioToLeverage = (collateralRatio: bigint) => {
  const BASE_RATIO = BigInt(10 ** COLLATERAL_RATIO_DECIMALS);
  return (collateralRatio * BASE_RATIO) / (collateralRatio - BASE_RATIO);
};

export async function fetchLeverageRatios(leverageToken: Address): Promise<CollateralRatios> {
  const { rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const [minCollateralRatio, maxCollateralRatio, targetCollateralRatio] = await Promise.all([
    getQueryClient().fetchQuery({
      ...getMinCollateralRatioQueryOptions(rebalanceAdapter),
    }),
    getQueryClient().fetchQuery({
      ...getMaxCollateralRatioQueryOptions(rebalanceAdapter),
    }),
    getQueryClient().fetchQuery({
      ...getTargetCollateralRatioQueryOptions(rebalanceAdapter),
    }),
  ]);

  return {
    minLeverage: formatFetchBigIntToViewBigInt({
      bigIntValue: cCollateralRatioToLeverage(maxCollateralRatio),
      decimals: 18,
      symbol: "x",
    }),
    maxLeverage: formatFetchBigIntToViewBigInt({
      bigIntValue: cCollateralRatioToLeverage(minCollateralRatio),
      decimals: 18,
      symbol: "x",
    }),
    targetLeverage: formatFetchBigIntToViewBigInt({
      bigIntValue: cCollateralRatioToLeverage(targetCollateralRatio),
      decimals: 18,
      symbol: "x",
    }),
  };
}
