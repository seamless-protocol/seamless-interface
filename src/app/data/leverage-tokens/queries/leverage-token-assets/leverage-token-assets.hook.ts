import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenAssets } from "./leverage-token-assets.fetch";

export const hookGetLeverageTokenAssetsQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetLeverageTokenAssets", leverageToken],
  queryFn: () => fetchLeverageTokenAssets(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchLeverageTokenAssets(leverageToken?: Address) {
  return useQuery(hookGetLeverageTokenAssetsQueryOptions(leverageToken));
}
