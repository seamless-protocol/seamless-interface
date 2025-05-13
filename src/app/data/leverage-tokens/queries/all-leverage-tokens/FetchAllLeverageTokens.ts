import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { formatFetchBigIntToViewBigInt, Token, ViewBigInt, ViewNumber, formatFetchNumberToViewNumber } from "@shared";

import mockLogo from "@assets/tokens/ilmWstethEth.svg";
import { TagType } from "../../../../statev3/common/types/StateTypes";

export interface ViewRewardToken {
  symbol: string;
  address?: Address;
  logo?: string;
  apr?: ViewNumber;
  points?: ViewNumber;
}

export interface LeverageToken {
  address: Address;
  tvl: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  apy: {
    estimatedAPY: ViewNumber;
    borrowAPY: ViewNumber;
    yieldAPY: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  availableSupplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  tokenData: Token;
  additionalData: {
    description: string;
  };
  type?: TagType;
}

export const mockLeverageTokens: LeverageToken[] = [
  {
    address: "0x1111111111111111111111111111111111111111" as Address,
    type: "Short",
    tvl: {
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
    tokenData: {
      name: "USD Coin Lvrg Token",
      decimals: 6,
      symbol: "USDCLT",
      logo: mockLogo,
    },
    additionalData: {
      description: "wstETH/USDC Looping",
    },
  },
  {
    address: "0x2222222222222222222222222222222222222222" as Address,
    type: "Long",
    tvl: {
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
    apy: {
      rewardTokens: [],
      yieldAPY: formatFetchNumberToViewNumber({
        value: 15.44,
        symbol: "%",
      }),
      borrowAPY: formatFetchNumberToViewNumber({
        value: 1.44,
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
    tokenData: {
      name: "USD Coin Lvrg Token 2",
      decimals: 6,
      symbol: "USDCLT2",
      logo: mockLogo,
    },
    additionalData: {
      description: "wstETH/USDC LT 2 descr",
    },
  },
];

/**
 * Mock fetchStrategies: returns our two dummy strategies
 */
export async function fetchLeverageTokens(): Promise<LeverageToken[]> {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1500));
  return mockLeverageTokens;
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
