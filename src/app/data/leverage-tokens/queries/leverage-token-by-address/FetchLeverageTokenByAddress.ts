import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/mockLeverageTokens";
import { fetchLeverageTokenCollateral } from "../collateral/collateral.fetch";
import { fetchToken } from "@shared";
import { fetchLeverageTokenAssetsTokenData } from "../leverage-token-assets/leverage-token-assets.fetch";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  const [collateral, tokenData, { collateralAssetTokenData, debtAssetTokenData }] = await Promise.all([
    fetchLeverageTokenCollateral(address),
    fetchToken(address),
    fetchLeverageTokenAssetsTokenData(address),
  ]);
  const leverageToken = mockLeverageTokens.find((token) => isAddressEqual(token.address, address));

  if (!leverageToken) {
    console.error(`Leverage token with address ${address} not configured`);
    throw new Error(`Leverage token with address ${address} not configured`);
  }

  return {
    ...leverageToken,
    tvl: collateral,
    tokenData,
    collateralAssetTokenData,
    debtAssetTokenData,
  };
}

export function useFetchLeverageTokenByAddress(address?: Address) {
  return useQuery<LeverageToken | undefined>({
    queryKey: ["hookFetchLeverageTokenByAddress", address],
    queryFn: () => fetchLeverageTokenByAddress(address!),
    enabled: Boolean(address),
  });
}
