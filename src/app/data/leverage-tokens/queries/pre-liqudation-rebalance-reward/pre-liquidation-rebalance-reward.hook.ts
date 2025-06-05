import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchPreLiquidationRebalanceReward } from "./pre-liquidation-rebalance-reward.fetch";

export const hookGetPreLiquidationRebalanceRewardQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetPreLiquidationRebalanceReward", leverageToken],
  queryFn: () => fetchPreLiquidationRebalanceReward(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchPreLiquidationRebalanceReward(leverageToken?: Address) {
  return useQuery(hookGetPreLiquidationRebalanceRewardQueryOptions(leverageToken));
}
