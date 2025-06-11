import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenEquity } from "./leverage-token-equity.fetch";

export const hookGetLeverageTokenEquityQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenEquity", leverageToken],
  queryFn: () => fetchLeverageTokenEquity(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenEquity(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenEquityQueryOptions(leverageToken));
}
