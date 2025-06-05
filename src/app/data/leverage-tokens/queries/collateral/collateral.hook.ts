import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenCollateral } from "./collateral.fetch";

export const hookGetLeverageTokenCollateralQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenCollateral", leverageToken],
  queryFn: () => fetchLeverageTokenCollateral(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenCollateral(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenCollateralQueryOptions(leverageToken));
}
