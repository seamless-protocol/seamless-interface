import {
  GetUserBalancesQueryVariables,
  GetUserBalancesQuery,
  GetUserBalancesDocument,
} from "../../../../../generated-graphql/subgraph-index";
import { getFuulApolloClient } from "../../../../config/apollo-clients";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const fetchUserBalancesQueryOptions = (variables: GetUserBalancesQueryVariables) => ({
  queryKey: FuulQueryKeys.userBalances(variables),
  queryFn: async () => {
    const apolloClient = getFuulApolloClient();

    const result = await apolloClient.query<GetUserBalancesQuery, GetUserBalancesQueryVariables>({
      query: GetUserBalancesDocument,
      variables,
      fetchPolicy: "no-cache",
    });

    checkGraphQlResponse(result);

    return result;
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchUserBalances(variables: GetUserBalancesQueryVariables) {
  const queryClient = getQueryClient();

  const result = await queryClient.fetchQuery({
    ...fetchUserBalancesQueryOptions(variables),
  });

  return result;
}
