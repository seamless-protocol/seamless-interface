import { formatFetchBigIntToViewBigInt, formatFetchNumberToViewNumber, Token, ViewBigInt, ViewNumber } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

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
  underlyingAssetAddress: Address;
  underlyingAsset: Token;
  tvl: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  debt: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
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
  tokenData: Token;
  additionalData: {
    description?: string;
  };
  type?: TagType;
  /** Range for rebalancing leverage */
  targetMultiples: {
    minForRebalance?: ViewBigInt;
    maxForRebalance?: ViewBigInt;
  };
  /** Current leverage multiple */
  currentMultiple: ViewBigInt;
}

export const mockLeverageTokens: LeverageToken[] = [
  {
    address: "0xa5Aa41483586D3530397de18B59122DAbc502817" as Address,
    underlyingAssetAddress: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    underlyingAsset: {
      symbol: "ETH",
      decimals: 18,
      name: "Ethereum",
      logo: mockLogo,
    },
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
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 32_000n * 10n ** 6n,
        decimals: 6,
        symbol: "ETH",
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 32_000n * 10n ** 6n,
        decimals: 8,
        symbol: "$",
      }),
    },
    targetMultiples: {
      minForRebalance: formatFetchBigIntToViewBigInt({ bigIntValue: 1n * 10n ** 18n, decimals: 18, symbol: "x" }),
      maxForRebalance: formatFetchBigIntToViewBigInt({ bigIntValue: 3n * 10n ** 18n, decimals: 18, symbol: "x" }),
    },
    currentMultiple: formatFetchBigIntToViewBigInt({ bigIntValue: 2n * 10n ** 18n, decimals: 18, symbol: "x" }),
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
    address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    underlyingAssetAddress: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    underlyingAsset: {
      symbol: "ETH",
      decimals: 18,
      name: "Ethereum",
      logo: mockLogo,
    },
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
    debt: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 32_000n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 32_000n * 10n ** 6n,
        decimals: 8,
        symbol: "$",
      }),
    },
    targetMultiples: {
      minForRebalance: formatFetchBigIntToViewBigInt({ bigIntValue: 1n * 10n ** 18n, decimals: 18, symbol: "x" }),
      maxForRebalance: formatFetchBigIntToViewBigInt({ bigIntValue: 3n * 10n ** 18n, decimals: 18, symbol: "x" }),
    },
    currentMultiple: formatFetchBigIntToViewBigInt({ bigIntValue: 2n * 10n ** 18n, decimals: 18, symbol: "x" }),
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
