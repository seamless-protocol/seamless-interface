import {
  BorrowApyByMarketIdDocument,
  BorrowApyByMarketIdQuery,
  BorrowApyByMarketIdQueryVariables,
} from "../../../../generated-graphql";
import { IS_DEV_MODE } from "../../../../globals";
import { getMorphoApolloClient } from "../../../config/apollo-clients";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { checkGraphQlResponse } from "../../../v3/utils/utils";
import { queryConfig } from "../../settings/queryConfig";

export const fetchBorrowApyByMarketIdQueryOptions = (marketId: string) => ({
  queryKey: ["fetchMarketBorrowApy", marketId] as const,
  queryFn: async () => {
    const client = getMorphoApolloClient();
    const result = await client.query<BorrowApyByMarketIdQuery, BorrowApyByMarketIdQueryVariables>({
      query: BorrowApyByMarketIdDocument,
      variables: { marketId },
      fetchPolicy: "no-cache",
    });
    checkGraphQlResponse(result);
    return result.data;
  },
  ...queryConfig.platformDataQueryConfig,
  retry: IS_DEV_MODE ? 0 : 3,
});

export async function fetchBorrowApyByMarketId(marketId: string) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchBorrowApyByMarketIdQueryOptions(marketId));
  return data;
}
