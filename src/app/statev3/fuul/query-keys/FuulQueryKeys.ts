import { GetPointsLeaderboardParams, GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { getHashedQueryKey, QueryTypes, Scopes } from "../../../../meta/query-keys";
import { GetUserBalancesQueryVariables } from "../../../../generated-graphql/subgraph-index";

export const FuulQueryKeys = {
  /* ---------------------- */
  /*    Query Type Scopes   */
  /* ---------------------- */

  childApiQueries: [
    {
      scope: Scopes.fuul,
      queryType: QueryTypes.CHILD_API_QUERY,
    },
  ] as const,

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

  /* --------------------- */
  /*   CHILD API QUERIES   */
  /* --------------------- */
  pointsLeaderboard: (params: GetPointsLeaderboardParams) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getPointsLeaderboard",
      ...params,
    },
  ],

  payoutsLeaderboard: (params: GetPayoutsLeaderboardParams) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getPayoutsLeaderboard",
      ...params,
    },
  ],

  /* ------------------- */
  /*   GRAPHQL QUERIES   */
  /* ------------------- */
  userBalances: (props: GetUserBalancesQueryVariables) => [
    {
      ...FuulQueryKeys.graphQlQueries[0],
      functionName: "GetUserBalances",
      ...props,
    },
  ],

  /* ---------------- */
  /*   HOOK QUERIES   */
  /* ---------------- */
  pointsLeaderboardHook: (params: GetPointsLeaderboardParams) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getPointsLeaderboardHook",
      ...params,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.pointsLeaderboard(params),
      }),
    },
  ],

  payoutsLeaderboardHook: (params: GetPayoutsLeaderboardParams) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getPayoutsLeaderboardHook",
      ...params,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.payoutsLeaderboard(params),
      }),
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
