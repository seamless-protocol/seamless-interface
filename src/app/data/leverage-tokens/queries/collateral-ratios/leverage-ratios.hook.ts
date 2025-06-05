import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageRatios } from "./leverage-ratios.fetch";

export const hookGetLeverageRatiosQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageRatios", leverageToken],
  queryFn: () => fetchLeverageRatios(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageRatios(leverageToken?: Address) {
  return useQuery(hookGetLeverageRatiosQueryOptions(leverageToken));
}
