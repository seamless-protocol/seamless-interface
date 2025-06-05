import { useQuery } from "@tanstack/react-query";
import { fetchLeverageTokenByAddress } from "../leverage-token-by-address/FetchLeverageTokenByAddress";
import { LeverageToken, mockLeverageTokens } from "./mockLeverageTokens";

/**
 * Mock fetchStrategies: returns our two dummy strategies
 */
export async function fetchLeverageTokens(): Promise<LeverageToken[]> {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1500));

  const leverageTokens = await Promise.all(
    mockLeverageTokens.map(async (token) => {
      const leverageToken = await fetchLeverageTokenByAddress(token.address);
      return {
        ...token,
        ...leverageToken,
      };
    })
  );

  console.log("leverageTokens", leverageTokens);

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
