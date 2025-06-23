import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { LendingAdapterAbi } from "../../../../../../abis/LendingAdapter";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getPreLiquidationRebalanceRewardQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getRebalanceReward",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const getLiquidationPenalty = (lendingAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: lendingAdapter,
    abi: LendingAdapterAbi,
    functionName: "getLiquidationPenalty",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const fetchPreLiquidationRebalanceReward = async (leverageToken: Address): Promise<ViewBigInt> => {
  const { lendingAdapter, rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const preLiquidationRebalanceReward = await getQueryClient().fetchQuery({
    ...getPreLiquidationRebalanceRewardQueryOptions(rebalanceAdapter),
  });

  const liquidationPenalty = await getQueryClient().fetchQuery({
    ...getLiquidationPenalty(lendingAdapter),
  });

  return formatFetchBigIntToViewBigInt({
    bigIntValue: liquidationPenalty * preLiquidationRebalanceReward,
    decimals: 20, // liquidationPenalty is 18 decimals, preLiquidationRebalanceReward is 2 decimals
    symbol: "%",
  });
};
