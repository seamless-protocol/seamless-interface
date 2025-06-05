import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchPreLiquidationCollateralRatio } from "./pre-liquidation-collateral-ratio.fetch";

export const hookGetPreLiquidationCollateralRatioQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetPreLiquidationCollateralRatio", leverageToken],
  queryFn: () => fetchPreLiquidationCollateralRatio(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchPreLiquidationCollateralRatio(leverageToken?: Address) {
  return useQuery(hookGetPreLiquidationCollateralRatioQueryOptions(leverageToken));
}
