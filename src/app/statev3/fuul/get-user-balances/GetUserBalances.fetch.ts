import {
  GetUserBalancesDocument,
  GetUserBalancesQuery,
  GetUserBalancesQueryVariables,
} from "../../../../generated-graphql/subgraph-index";
import { getFuulApolloClient } from "../../../config/apollo-clients";
import { checkGraphQlResponse } from "../../../v3/utils/utils";

export const fetchUserBalances = async (variables: GetUserBalancesQueryVariables): Promise<GetUserBalancesQuery> => {
  const client = getFuulApolloClient();

  const result = await client.query<GetUserBalancesQuery, GetUserBalancesQueryVariables>({
    query: GetUserBalancesDocument,
    variables,
    fetchPolicy: "no-cache",
  });

  checkGraphQlResponse?.(result); // Optional, depending on how you handle API results

  return result.data;
};
