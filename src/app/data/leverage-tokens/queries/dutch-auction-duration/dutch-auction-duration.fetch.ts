import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";

export const getDutchAuctionDurationQueryOptions = (rebalanceAdapter: Address) => ({
  ...readContractQueryOptions(config, {
    address: rebalanceAdapter,
    abi: RebalanceAdapterAbi,
    functionName: "getAuctionDuration",
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export const fetchDutchAuctionDuration = async (leverageToken: Address): Promise<string> => {
  const { rebalanceAdapter } = await fetchLeverageTokenConfig(leverageToken);

  const duration = await getQueryClient().fetchQuery({
    ...getDutchAuctionDurationQueryOptions(rebalanceAdapter),
  });

  return new Date(Number(duration) * 1000).toISOString().slice(11, 19);
};
