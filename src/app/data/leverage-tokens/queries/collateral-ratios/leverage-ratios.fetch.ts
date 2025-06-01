import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { ONE_ETHER } from "../../../../../meta";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
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
  return (collateralRatio * ONE_ETHER) / (collateralRatio - ONE_ETHER);
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
      bigIntValue: cCollateralRatioToLeverage(minCollateralRatio),
      decimals: 18,
      symbol: "x",
    }),
    maxLeverage: formatFetchBigIntToViewBigInt({
      bigIntValue: cCollateralRatioToLeverage(maxCollateralRatio),
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
