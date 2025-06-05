import {
  formatFetchBigIntToViewBigInt,
  formatFetchNumberToViewNumber,
  ViewBigInt,
  ViewBigIntWithUsdValue,
  ViewNumber,
} from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchLeverageTokenByAddress } from "../leverage-token-by-address/FetchLeverageTokenByAddress";

export interface ViewRewardToken {
  symbol: string;
  address?: Address;
  logo?: string;
  apr?: ViewNumber;
  points?: ViewNumber;
}

export interface LeverageToken {
  address: Address;
  availableSupplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  apy: {
    estimatedAPY: ViewNumber;
    borrowAPY: ViewNumber;
    yieldAPY: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  tvl?: ViewBigIntWithUsdValue;
  additionalData: {
    description?: string;
  };
}

export const mockLeverageTokens: LeverageToken[] = [
  {
    address: "0xA2fceEAe99d2cAeEe978DA27bE2d95b0381dBB8c" as Address,
    apy: {
      rewardTokens: [],
      yieldAPY: formatFetchNumberToViewNumber({
        value: 55.44,
        symbol: "%",
      }),
      borrowAPY: formatFetchNumberToViewNumber({
        value: 12.44,
        symbol: "%",
      }),
      estimatedAPY: formatFetchNumberToViewNumber({
        value: 12.44,
        symbol: "%",
      }),
    },
    availableSupplyCap: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 500_000n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 500_000n * 10n ** 6n,
        decimals: 8,
        symbol: "$",
      }),
    },
    additionalData: {
      description: "wstETH/USDC Looping",
    },
  },
];

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
