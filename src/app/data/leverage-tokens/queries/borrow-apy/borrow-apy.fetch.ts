import { Address } from "viem";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
import { fetchMarketDataByMarketId } from "../../../morpho/market-data-by-market-id/MarketDataByMarketId.fetch";
import { fetchMorphoMarketId } from "../market-id/market-id.fetch";
import { useQuery } from "@tanstack/react-query";

export async function fetchBorrowApy(leverageToken: Address) {
  const { lendingAdapter } = await fetchLeverageTokenConfig(leverageToken);
  const marketId = await fetchMorphoMarketId({ adapterAddress: lendingAdapter });
  if (!marketId) throw new Error("fetchBorrowApy: Market id is not found");

  const borrowApy = await fetchMarketDataByMarketId(marketId);
  return borrowApy?.marketByUniqueKey?.state?.borrowApy;
}

export const useFetchBorrowApy = (leverageToken?: Address) => {
  return useQuery({
    queryKey: ["hookBorrowApy", leverageToken],
    queryFn: () => fetchBorrowApy(leverageToken!),
    enabled: Boolean(leverageToken),
  });
};
