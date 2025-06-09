import { useQuery } from "@tanstack/react-query";
import { Address, isAddressEqual } from "viem";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/mockLeverageTokens";
import { fetchLeverageTokenCollateral } from "../collateral/collateral.fetch";
import { fetchToken, formatFetchNumberToViewNumber } from "@shared";
import { fetchLeverageTokenAssetsTokenData } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchEtherFiApy } from "../etherfi-apy/EtherfiApy.fetch";
import { fetchBorrowApy } from "../borrow-apy/borrow-apy.fetch";

import chartIcon from "@assets/common/chart.svg";
import KINGIcon from "@assets/logos/KING-icon.svg";

/**
 * Mock fetchLeverageTokenByAddress: returns a single token by address (or undefined if not found)
 */
export async function fetchLeverageTokenByAddress(address: Address): Promise<LeverageToken | undefined> {
  const [collateral, tokenData, { collateralAssetTokenData, debtAssetTokenData }, etherfyApy, borrowApy] =
    await Promise.all([
      fetchLeverageTokenCollateral(address),
      fetchToken(address),
      fetchLeverageTokenAssetsTokenData(address),
      fetchEtherFiApy(), // move this out?
      fetchBorrowApy(address), // move this out?
    ]);
  const leverageToken = mockLeverageTokens.find((token) => isAddressEqual(token.address, address));

  if (!leverageToken) {
    console.error(`Leverage token with address ${address} not configured`);
    throw new Error(`Leverage token with address ${address} not configured`);
  }

  const estimatedAPY =
    etherfyApy.apyView.value == null || borrowApy == null
      ? formatFetchNumberToViewNumber({
          value: undefined,
          symbol: "%",
        })
      : formatFetchNumberToViewNumber({
          value: etherfyApy.apyView.value - borrowApy,
          symbol: "%",
        });

  const borrowAPY = formatFetchNumberToViewNumber({
    value: borrowApy,
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
      restakingAPY: etherfyApy.restakingAPy,
      borrowAPY,
      rewardTokens: [
        {
          symbol: "Native APY",
          apr: etherfyApy.apyView,
          logo: chartIcon,
        },
        {
          symbol: "Restaking APY",
          apr: etherfyApy.restakingAPy,
          logo: KINGIcon,
        },
        {
          symbol: "Borrow APY",
          apr: borrowAPY,
          logo: chartIcon,
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
