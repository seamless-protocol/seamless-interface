import { Scopes, QueryTypes, getHashedQueryKey } from "../../../../meta/query-keys";

export const CountryDataKeys = {
  apiQueries: [
    {
      scope: Scopes.clientMetaApi,
      queryType: QueryTypes.CHILD_API_QUERY,
    },
  ] as const,

  /** Base config for hook queries */
  hookQueries: [
    {
      scope: Scopes.clientMetaApi,
      queryType: QueryTypes.HOOK,
    },
  ] as const,

  fetchIsUserRestricted: () =>
    [
      {
        ...CountryDataKeys.apiQueries[0],
        functionName: "fetchIsUserRestricted",
      },
    ] as const,

  isUserRestricted: () =>
    [
      {
        ...CountryDataKeys.hookQueries[0],
        functionName: "isUserRestricted",
        ...getHashedQueryKey({
          queryKey: CountryDataKeys.fetchIsUserRestricted(),
        }),
      },
    ] as const,
};
