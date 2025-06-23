import { base } from "viem/chains";
import { IS_DEV_MODE } from "../../../../globals";
import { getMorphoApolloClient } from "../../../config/apollo-clients";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { checkGraphQlResponse } from "../../../v3/utils/utils";
import { queryConfig } from "../../settings/queryConfig";
import {
  MarketDataByMarketIdDocument,
  MarketDataByMarketIdQuery,
  MarketDataByMarketIdQueryVariables,
} from "../../../../generated-graphql";

export const fetchMarketDataByMarketIdQueryOptions = (marketId: string) => ({
  queryKey: ["fetchMarketBorrowApy", marketId] as const,
  queryFn: async () => {
    const client = getMorphoApolloClient();
    const result = await client.query<MarketDataByMarketIdQuery, MarketDataByMarketIdQueryVariables>({
      query: MarketDataByMarketIdDocument,
      variables: { uniqueKey: marketId, chainId: base.id },
      fetchPolicy: "no-cache",
    });
    checkGraphQlResponse(result);
    return result.data;
  },
  ...queryConfig.platformDataQueryConfig,
  retry: IS_DEV_MODE ? 0 : 3,
});

export async function fetchMarketDataByMarketId(marketId: string) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchMarketDataByMarketIdQueryOptions(marketId));
  return data;
}
