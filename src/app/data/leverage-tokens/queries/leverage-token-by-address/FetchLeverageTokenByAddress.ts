import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/mockLeverageTokens";
import { fetchLeverageTokenCollateral } from "../collateral/collateral.fetch";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  // simulate network latency
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1500));

  const collateral = await fetchLeverageTokenCollateral(address);
  const leverageToken = mockLeverageTokens.find((token) => isAddressEqual(token.address, address));

  if (!leverageToken) {
    return undefined;
  }

  leverageToken.tvl = collateral;
  return leverageToken;
}

export function useFetchLeverageTokenByAddress(address?: Address) {
  return useQuery<LeverageToken | undefined>({
    queryKey: ["hookFetchLeverageTokenByAddress", address],
    queryFn: () => fetchLeverageTokenByAddress(address!),
    enabled: Boolean(address),
  });
}
