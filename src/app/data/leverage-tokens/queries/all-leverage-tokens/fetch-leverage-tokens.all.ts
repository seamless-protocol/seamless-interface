import { useQuery } from "@tanstack/react-query";
import { fetchLeverageTokenByAddress } from "../leverage-token-by-address/FetchLeverageTokenByAddress";
import { LeverageToken, leverageTokensConfig } from "./leverageTokens";

/**
 * Mock fetchStrategies: returns our two dummy strategies
 */
export async function fetchLeverageTokens(): Promise<LeverageToken[]> {
  const leverageTokens = await Promise.all(
    leverageTokensConfig.map(async (token) => {
      const leverageToken = await fetchLeverageTokenByAddress(token.address);
      return {
        ...token,
        ...leverageToken,
      };
    })
  );

  return leverageTokens;
}

/**
 * Override your real hook in tests/storybook to use this mock instead:
 */
export function useFetchAllLeverageTokens() {
  return useQuery<LeverageToken[]>({
    queryKey: ["hookFetchAllLeverageTokens"],
    queryFn: fetchLeverageTokens,
  });
}
