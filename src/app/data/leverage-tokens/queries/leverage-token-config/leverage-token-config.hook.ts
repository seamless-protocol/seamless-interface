import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenConfig } from "./leverage-token-config.fetch";

export const hookGetLeverageTokenConfigQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenConfig", leverageToken],
  queryFn: () => fetchLeverageTokenConfig(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenConfig(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenConfigQueryOptions(leverageToken));
}
