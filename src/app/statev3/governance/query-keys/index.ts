import { getHashedQueryKey, QueryTypes, Scopes } from "@meta";
import { Address } from "viem";
import { fetchVestedSeamQueryOptions } from "../queries/vested-seam/FetchVetchVestedSeam.fetch";

export const GovernanceQueryKeys = {
  hookQueries: [
    {
      scope: Scopes.blockchain,
      queryType: QueryTypes.HOOK,
    },
  ] as const,

  /* ---------------- */
  /*   Hook queries   */
  /* ---------------- */
  hookFetchVestedSeam: (userAccount: Address) => [
    {
      ...GovernanceQueryKeys.hookQueries[0],
      functionName: "hookFetchVestedSeam",
      ...getHashedQueryKey({
        queryKey: fetchVestedSeamQueryOptions(userAccount).queryKey,
      }),
    },
  ],

  hookFetchVestedSeamWithDollarAmount: (userAccount: Address) => [
    {
      ...GovernanceQueryKeys.hookQueries[0],
      functionName: "hookFetchVestedSeamWithDollarAmount",
      ...getHashedQueryKey({
        queryKey: fetchVestedSeamQueryOptions(userAccount).queryKey,
      }),
    },
  ],
};
