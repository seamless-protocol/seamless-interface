import { getLeverageTokenApolloClient } from "../../../../config/apollo-clients";
import {
  CollateralPriceHistoricalDocument,
  CollateralPriceHistoricalQuery,
  CollateralPriceHistoricalQueryVariables,
} from "../../../../../generated-graphql/leverage-token-index";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";
import { queryConfig } from "../../../settings/queryConfig";
import { MAX_HISTORICAL_DATA_POINTS } from "../../../../../meta/constants";

export const fetchCollateralPriceHistoricalQueryOptions = (variables: { address: string }) => ({
  queryKey: ["fetchCollateralPriceHistorical", variables.address],
  queryFn: async () => {
    const client = getLeverageTokenApolloClient();

    // 1000 is the maximum number of items that can be returned by the subgraph. If there are more
    // items, we need to paginate.
    let response;
    let skip = 0;

    while (skip < MAX_HISTORICAL_DATA_POINTS) {
      const result = await client.query<CollateralPriceHistoricalQuery, CollateralPriceHistoricalQueryVariables>({
        query: CollateralPriceHistoricalDocument,
        variables: { address: variables.address, first: 1000, skip },
        fetchPolicy: "no-cache",
      });

      checkGraphQlResponse(result);

      if (skip === 0) {
        response = result.data;
      } else if (response?.leverageToken && result.data.leverageToken?.lendingAdapter?.oracle?.priceUpdates) {
        response.leverageToken.lendingAdapter.oracle.priceUpdates.push(
          ...result.data.leverageToken.lendingAdapter.oracle.priceUpdates
        );
      }

      const priceUpdatesLength = result.data.leverageToken?.lendingAdapter?.oracle?.priceUpdates?.length || 0;
      if (priceUpdatesLength < 1000) {
        break;
      } else {
        skip += 1000;
      }
    }

    return response;
  },
  ...queryConfig.platformDataQueryConfig,
});

export async function fetchCollateralPriceHistorical(variables: { address: string }) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchCollateralPriceHistoricalQueryOptions(variables));
  return data;
}
