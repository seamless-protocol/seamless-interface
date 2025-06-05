import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getPreLiquidationRebalanceRewardQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getRebalanceReward",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const fetchPreLiquidationRebalanceReward = async (leverageToken: Address): Promise<ViewBigInt> => {
  const { rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const preLiquidationRebalanceReward = await getQueryClient().fetchQuery({
    ...getPreLiquidationRebalanceRewardQueryOptions(rebalanceAdapter),
  });

  return formatFetchBigIntToViewBigInt({
    bigIntValue: preLiquidationRebalanceReward,
    decimals: 2,
    symbol: "%",
  });
};
