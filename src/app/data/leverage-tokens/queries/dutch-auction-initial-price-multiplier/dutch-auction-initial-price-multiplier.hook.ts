import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchDutchAuctionInitialPriceMultiplier } from "./dutch-auction-initial-price-multiplier.fetch";

export const hookGetDutchAuctionInitialPriceMultiplierQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetDutchAuctionInitialPriceMultiplier", leverageToken],
  queryFn: () => fetchDutchAuctionInitialPriceMultiplier(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchDutchAuctionInitialPriceMultiplier(leverageToken?: Address) {
  return useQuery(hookGetDutchAuctionInitialPriceMultiplierQueryOptions(leverageToken));
}
