import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenDebt } from "./debt.fetch";

export const hookGetLeverageTokenDebtQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenDebt", leverageToken],
  queryFn: () => fetchLeverageTokenDebt(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenDebt(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenDebtQueryOptions(leverageToken));
}
