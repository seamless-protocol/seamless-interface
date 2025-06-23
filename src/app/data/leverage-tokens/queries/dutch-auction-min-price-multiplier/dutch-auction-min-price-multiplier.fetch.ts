import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { AUCTION_PRICE_MULTIPLIER_DECIMALS } from "../../../../../meta";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getDutchAuctionMinPriceMultiplierQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getMinPriceMultiplier",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const fetchDutchAuctionMinPriceMultiplier = async (leverageToken: Address): Promise<ViewBigInt> => {
  const { rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const minPriceMultiplier = await getQueryClient().fetchQuery({
    ...getDutchAuctionMinPriceMultiplierQueryOptions(rebalanceAdapter),
  });

  return formatFetchBigIntToViewBigInt({
    bigIntValue: minPriceMultiplier,
    decimals: AUCTION_PRICE_MULTIPLIER_DECIMALS,
    symbol: "x",
  }, undefined, { roundDown: true });
};
