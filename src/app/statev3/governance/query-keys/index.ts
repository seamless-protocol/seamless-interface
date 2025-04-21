import { Address } from "viem";
import { fetchSeamRewardsQueryOptions } from "../queries/rewards/FetchSeamRewards.hook";

export const GovernanceQueryKeys = {
  /* ----------------- */
  /*   Child queries   */
  /* ----------------- */
  fetchSeamRewards: (userAccount: Address) => fetchSeamRewardsQueryOptions(userAccount).queryKey,

  /* ---------------- */
  /*   Hook queries   */
  /* ---------------- */
};
