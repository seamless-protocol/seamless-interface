import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenState } from "./leverage-token-state.fetch";

export const hookGetLeverageTokenStateQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenState", leverageToken],
  queryFn: () => fetchLeverageTokenState(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenState(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenStateQueryOptions(leverageToken));
}
