import { Address } from "viem";
import { fetchLeverageTokenConfig } from "../leverage-token-config/leverage-token-config.fetch";
import { fetchMarketDataByMarketId } from "../../../morpho/market-data-by-market-id/MarketDataByMarketId.fetch";
import { fetchMorphoMarketId } from "../market-id/market-id.fetch";
import { useQuery } from "@tanstack/react-query";

export async function fetchUtilization(leverageToken: Address) {
  const { lendingAdapter } = await fetchLeverageTokenConfig(leverageToken);
  const marketId = await fetchMorphoMarketId({ adapterAddress: lendingAdapter });
  if (!marketId) throw new Error("fetchUtilization: Market id is not found");

  const data = await fetchMarketDataByMarketId(marketId);

  return {
    currentUtilization: data?.marketByUniqueKey?.state?.utilization,
    optimalUtilization: data?.marketByUniqueKey
      ? // all current Morpho markets are expected to target 90% utilization according to docs
        Number(90)
      : undefined,
  };
}

export const useFetchUtilization = (leverageToken?: Address) => {
  return useQuery({
    queryKey: ["hookFetchBorrowApy", leverageToken],
    queryFn: () => fetchUtilization(leverageToken!),
    enabled: Boolean(leverageToken),
  });
};
