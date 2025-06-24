import {
  LeverageTokenValueHistoricalDocument,
  LeverageTokenValueHistoricalQuery,
  LeverageTokenValueHistoricalQueryVariables,
} from "../../../../../generated-graphql/leverage-token-index";
import { getLeverageTokenApolloClient } from "../../../../config/apollo-clients";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";
import { MAX_HISTORICAL_DATA_POINTS } from "../../../../../meta/constants";

export const fetchLeverageTokenValueHistoricalQueryOptions = (variables: { address: string }) => ({
  queryKey: ["fetchLeverageTokenValueHistorical", variables.address],
  queryFn: async () => {
    const client = getLeverageTokenApolloClient();

    // 1000 is the maximum number of items that can be returned by the subgraph. If there are more
    // items, we need to paginate.
    let response;
    let skip = 0;

    while (skip < MAX_HISTORICAL_DATA_POINTS) {
      const result = await client.query<LeverageTokenValueHistoricalQuery, LeverageTokenValueHistoricalQueryVariables>({
        query: LeverageTokenValueHistoricalDocument,
        variables: { address: variables.address, first: 1000, skip },
        fetchPolicy: "no-cache",
      });

      checkGraphQlResponse(result);

      if (skip === 0) {
        response = result.data;
      } else if (response?.leverageToken && result.data.leverageToken?.stateHistory) {
        response.leverageToken.stateHistory.push(...result.data.leverageToken.stateHistory);
      }

      const stateHistoryLength = result.data.leverageToken?.stateHistory?.length || 0;
      if (stateHistoryLength < 1000) {
        break;
      } else {
        skip += 1000;
      }
    }

    return response;
  },
  ...queryConfig.platformDataQueryConfig,
});

export async function fetchLeverageTokenValueHistorical(variables: { address: string }) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchLeverageTokenValueHistoricalQueryOptions(variables));
  return data;
}
