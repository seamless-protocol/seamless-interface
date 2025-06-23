import { GetPointsLeaderboardParams, GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { getHashedQueryKey, QueryTypes, Scopes } from "../../../../meta/query-keys";
import { GetUserBalancesQueryVariables } from "../../../../generated-graphql/subgraph-index";
import { Address } from "viem";

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

  volumeLeaderboard: (params: GetPayoutsLeaderboardParams) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getVolumeLeaderboard",
      ...params,
    },
  ],

  conversions: (params: GetPayoutsLeaderboardParams) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getConversions",
      ...params,
    },
  ],

  conversionById: (id: string) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getConversionByProject",
      id,
    },
  ],

  conversionByTokenAddress: (address: Address) => [
    {
      ...FuulQueryKeys.childApiQueries[0],
      functionName: "getConversionByTokenAddress",
      address,
    },
  ],

  /* ------------------- */
  /*   GRAPHQL QUERIES   */
  /* ------------------- */
  userBalances: (params: GetUserBalancesQueryVariables) => [
    {
      ...FuulQueryKeys.graphQlQueries[0],
      functionName: "GetUserBalances",
      ...params,
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

  conversionByProjectHook: (id: string) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getConversionByProjectHook",
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.conversionById(id),
      }),
    },
  ],

  pointsUserPositionHook: (user_address: Address) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getPointsUserPositionHook",
      user: user_address,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.pointsLeaderboard({
          user_address,
        }),
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

  volumeLeaderboardHook: (params: GetPayoutsLeaderboardParams) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getVolumeLeaderboardHook",
      ...params,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.volumeLeaderboard(params),
      }),
    },
  ],

  userBalancesHook: (params: GetUserBalancesQueryVariables) => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "GetUserBalancesHook",
      ...params,
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.userBalances(params),
      }),
    },
  ],

  totalNumberOfUsersHook: () => [
    {
      ...FuulQueryKeys.hookQueries[0],
      functionName: "getTotalNumberOfUsersHook",
      ...getHashedQueryKey({
        queryKey: FuulQueryKeys.volumeLeaderboard({}),
      }),
    },
  ],
};
