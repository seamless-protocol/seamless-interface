import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchDutchAuctionMinPriceMultiplier } from "./dutch-auction-min-price-multiplier.fetch";

export const hookGetDutchAuctionMinPriceMultiplierQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetDutchAuctionMinPriceMultiplier", leverageToken],
  queryFn: () => fetchDutchAuctionMinPriceMultiplier(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchDutchAuctionMinPriceMultiplier(leverageToken?: Address) {
  return useQuery(hookGetDutchAuctionMinPriceMultiplierQueryOptions(leverageToken));
}
