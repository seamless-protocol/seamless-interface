import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { cCollateralRatioToLeverage } from "../collateral-ratios/leverage-ratios.fetch";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getPreLiquidationCollateralRatioQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getCollateralRatioThreshold",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const fetchPreLiquidationCollateralRatio = async (leverageToken: Address): Promise<ViewBigInt> => {
  const { rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const preLiquidationCollateralRatio = await getQueryClient().fetchQuery({
    ...getPreLiquidationCollateralRatioQueryOptions(rebalanceAdapter),
  });

  return formatFetchBigIntToViewBigInt({
    bigIntValue: cCollateralRatioToLeverage(preLiquidationCollateralRatio),
    decimals: 18,
    symbol: "x",
  })
};
