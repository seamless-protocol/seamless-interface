// src/hooks/useLeverageTokenFeeStats.ts
import {
  Displayable,
  formatFetchBigIntToViewBigInt,
  formatFetchNumberToViewNumber,
  ViewBigInt,
  ViewNumber,
} from "@shared";
import { Address } from "viem";

export interface FeePair {
  tokenFee: ViewBigInt;
  treasuryFee: ViewBigInt;
}

export interface FeesStats {
  depositFee: FeePair;
  withdrawFee: FeePair;
  managementFeePercent: ViewNumber;
}

export function useLeverageTokenFeeStats(_tokenAddress?: Address): Displayable<FeesStats> {
  const mock: FeesStats = {
    depositFee: {
      tokenFee: formatFetchBigIntToViewBigInt({
        bigIntValue: 5n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
      treasuryFee: formatFetchBigIntToViewBigInt({
        bigIntValue: 1n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
    },
    withdrawFee: {
      tokenFee: formatFetchBigIntToViewBigInt({
        bigIntValue: 3n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
      treasuryFee: formatFetchBigIntToViewBigInt({
        bigIntValue: 5n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
    },
    managementFeePercent: formatFetchNumberToViewNumber({
      value: 1.5,
      symbol: "%",
    }), // 1.5%
  };

  return {
    data: mock,
    isLoading: false,
    isError: false,
    isFetched: true,
  };
}
