import { Scopes, QueryTypes, getHashedQueryKey } from "../../../../meta/query-keys";

export const CountryDataKeys = {
  apiQueries: [
    {
      scope: Scopes.common,
      queryType: QueryTypes.CHILD_API_QUERY,
    },
  ] as const,

  /** Base config for hook queries */
  hookQueries: [
    {
      scope: Scopes.common,
      queryType: QueryTypes.HOOK,
    },
  ] as const,

  /** Key for fetching the embargoed country list */
  fetchBlacklist: () =>
    [
      {
        ...CountryDataKeys.apiQueries[0],
        functionName: "fetchBlacklist",
      },
    ] as const,

  /** Key for fetching the user's country */
  fetchUserCountry: () =>
    [
      {
        ...CountryDataKeys.apiQueries[0],
        functionName: "fetchUserCountry",
      },
    ] as const,

  /** Key for combined country data (blacklist + userCountry) */
  countryData: () =>
    [
      {
        ...CountryDataKeys.hookQueries[0],
        functionName: "countryData",
        ...getHashedQueryKey({
          queryKey: CountryDataKeys.fetchBlacklist(),
        }),
        ...getHashedQueryKey({
          queryKey: CountryDataKeys.fetchUserCountry(),
        }),
      },
    ] as const,
};
