import { getHashedQueryKey, QueryTypes, Scopes } from "@meta";
import { Address } from "viem";
import { fetchVestedSeamQueryOptions } from "../queries/rewards/FetchVetchVestedSeam.fetch";

export const GovernanceQueryKeys = {
  hookQueries: [
    {
      scope: Scopes.governance,
      queryType: QueryTypes.HOOK,
    },
  ] as const,

  /* ---------------- */
  /*   Hook queries   */
  /* ---------------- */
  hookFetchSeamRewards: (userAccount: Address) => [
    {
      ...GovernanceQueryKeys.hookQueries[0],
      functionName: "seamRewardsHook",
      ...getHashedQueryKey({
        queryKey: fetchVestedSeamQueryOptions(userAccount).queryKey,
      }),
    },
  ],
};
