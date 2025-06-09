import { useQuery } from "@tanstack/react-query";
import { USD_VALUE_DECIMALS } from "../../../../../meta";
import { formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { fetchLeverageTokens } from "../all-leverage-tokens/fetch-leverage-tokens.all";

export const fetchTotalLeverageTokenEquity = async () => {
  const leverageTokens = await fetchLeverageTokens();

  let equityUsdValue: bigint | undefined;

  leverageTokens.forEach((leverageToken) => {
    if (leverageToken.tvl?.dollarAmount.bigIntValue) {
      if (!equityUsdValue) {
        equityUsdValue = leverageToken.tvl?.dollarAmount.bigIntValue;
      } else {
        equityUsdValue += leverageToken.tvl?.dollarAmount.bigIntValue;
      }
    }
  });

  return formatFetchBigIntToViewBigInt({
    bigIntValue: equityUsdValue,
    decimals: USD_VALUE_DECIMALS,
    symbol: "$",
  });
};

export const getTotalLeverageTokenEquityQueryOptions = () => ({
  queryKey: ["useGetTotalLeverageTokenEquity"],
  queryFn: () => fetchTotalLeverageTokenEquity(),
});

export function useFetchTotalLeverageTokenEquity() {
  return useQuery(getTotalLeverageTokenEquityQueryOptions());
}
