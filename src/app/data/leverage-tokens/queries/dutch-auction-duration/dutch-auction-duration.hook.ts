import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchDutchAuctionDuration } from "./dutch-auction-duration.fetch";

export const hookGetDutchAuctionDurationQueryOptions = (leverageToken?: Address) => ({
  queryKey: ["useGetDutchAuctionDuration", leverageToken],
  queryFn: () => fetchDutchAuctionDuration(leverageToken!),
  enabled: Boolean(leverageToken),
});

export function useFetchDutchAuctionDuration(leverageToken?: Address) {
  return useQuery(hookGetDutchAuctionDurationQueryOptions(leverageToken));
}
