import { Scopes, QueryTypes, getHashedQueryKey } from "../../../../meta/query-keys";
import { GetUserBalancesQueryVariables } from "../../../../generated-graphql/subgraph-index";

export const FuulQueryKeys = {
  graphQlQueries: [
    {
      scope: Scopes.fuul,
      queryType: QueryTypes.GRAPH_QL_QUERY,
    },
  ] as const,

  hookQueries: [
    {
      scope: Scopes.fuul,
      queryType: QueryTypes.HOOK,
    },
  ] as const,

  userBalances: (props: GetUserBalancesQueryVariables) => [
    {
      ...FuulQueryKeys.graphQlQueries[0],
      functionName: "GetUserBalances",
      ...props,
    },
  ],

  userBalancesHook: (props: GetUserBalancesQueryVariables) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "GetUserBalancesHook",
      ...props,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.userBalances(props),
      }),
    },
  ],
};
