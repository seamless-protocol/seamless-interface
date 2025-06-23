import { getLeverageTokenApolloClient } from "../../../../config/apollo-clients";
import {
  CollateralPriceHistoricalDocument,
  CollateralPriceHistoricalQuery,
  CollateralPriceHistoricalQueryVariables,
} from "../../../../../generated-graphql/leverage-token-index";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";
import { queryConfig } from "../../../settings/queryConfig";

export const fetchCollateralPriceHistoricalQueryOptions = (variables: { address: string }) => ({
  queryKey: ["fetchCollateralPriceHistorical", variables.address],
  queryFn: async () => {
    const client = getLeverageTokenApolloClient();
    const result = await client.query<CollateralPriceHistoricalQuery, CollateralPriceHistoricalQueryVariables>({
      query: CollateralPriceHistoricalDocument,
      variables: { address: variables.address },
      fetchPolicy: "no-cache",
    });

    checkGraphQlResponse(result);

    return result.data;
  },
  ...queryConfig.platformDataQueryConfig,
});

export async function fetchCollateralPriceHistorical(variables: { address: string }) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchCollateralPriceHistoricalQueryOptions(variables));
  return data;
}
