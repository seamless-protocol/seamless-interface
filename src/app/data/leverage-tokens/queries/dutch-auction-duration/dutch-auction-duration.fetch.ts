import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { RebalanceAdapterAbi } from "../../../../../../abis/RebalanceAdapter";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
import { intervalToDuration, formatDuration } from "date-fns";

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

  return formatDuration(intervalToDuration({ start: 0, end: Number(duration) * 1000 }));
};
