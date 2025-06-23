import {
  LeverageTokenValueHistoricalDocument,
  LeverageTokenValueHistoricalQuery,
  LeverageTokenValueHistoricalQueryVariables,
} from "../../../../../generated-graphql/leverage-token-index";
import { getLeverageTokenApolloClient } from "../../../../config/apollo-clients";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";

export const fetchLeverageTokenValueHistoricalQueryOptions = (variables: { address: string }) => ({
  queryKey: ["fetchLeverageTokenValueHistorical", variables.address],
  queryFn: async () => {
    const client = getLeverageTokenApolloClient();

    const result = await client.query<LeverageTokenValueHistoricalQuery, LeverageTokenValueHistoricalQueryVariables>({
      query: LeverageTokenValueHistoricalDocument,
      variables: { address: variables.address },
      fetchPolicy: "no-cache",
    });

    checkGraphQlResponse(result);
    return result.data;
  },
  ...queryConfig.platformDataQueryConfig,
});

export async function fetchLeverageTokenValueHistorical(variables: { address: string }) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchLeverageTokenValueHistoricalQueryOptions(variables));
  return data;
}
