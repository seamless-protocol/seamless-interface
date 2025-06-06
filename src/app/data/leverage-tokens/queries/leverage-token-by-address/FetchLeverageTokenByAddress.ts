import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/mockLeverageTokens";
import { fetchLeverageTokenCollateral } from "../collateral/collateral.fetch";
import { fetchToken, formatFetchNumberToViewNumber } from "@shared";
import { fetchLeverageTokenAssetsTokenData } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchEtherFiData } from "../etherfi-apy/EtherfiApy.fetch";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  const [collateral, tokenData, { collateralAssetTokenData, debtAssetTokenData }, etherfyApy] = await Promise.all([
    fetchLeverageTokenCollateral(address),
    fetchToken(address),
    fetchLeverageTokenAssetsTokenData(address),
    fetchEtherFiData(),
  ]);
  const leverageToken = mockLeverageTokens.find((token) => isAddressEqual(token.address, address));

  if (!leverageToken) {
    console.error(`Leverage token with address ${address} not configured`);
    throw new Error(`Leverage token with address ${address} not configured`);
  }

  const estimatedAPY =
    etherfyApy.apyView.value == null || leverageToken.apy.borrowAPY.value == null // todo real borrow apy
      ? formatFetchNumberToViewNumber({
          value: undefined,
          symbol: "%",
        })
      : formatFetchNumberToViewNumber({
          value: etherfyApy.apyView.value - leverageToken.apy.borrowAPY.value,
          symbol: "%",
        });

  return {
    ...leverageToken,
    tvl: collateral,
    tokenData,
    collateralAssetTokenData,
    debtAssetTokenData,
    apy: {
      ...leverageToken.apy,
      estimatedAPY,
      yieldAPY: etherfyApy.apyView,
      rewardTokens: [
        {
          symbol: "Estimated APY",
          apr: estimatedAPY,
        },
      ],
    },
  };
}

export function useFetchLeverageTokenByAddress(address?: Address) {
  return useQuery<LeverageToken | undefined>({
    queryKey: ["hookFetchLeverageTokenByAddress", address],
    queryFn: () => fetchLeverageTokenByAddress(address!),
    enabled: Boolean(address),
  });
}
