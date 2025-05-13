import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/FetchAllLeverageTokens";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  // simulate network latency
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1500));
  return mockLeverageTokens.find((token) => isAddressEqual(token.address, address));
}

export function useFetchLeverageTokenByAddress(address?: Address) {
  return useQuery<LeverageToken | undefined>({
    queryKey: ["hookFetchLeverageTokenByAddress", address],
    queryFn: () => fetchLeverageTokenByAddress(address!),
    enabled: Boolean(address),
  });
}
