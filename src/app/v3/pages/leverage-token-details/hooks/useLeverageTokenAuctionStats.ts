import { Displayable, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { Address } from "viem";

export interface AuctionParameters {
  reservePrice: {
    dollarAmount: ViewBigInt;
    tokenAmount: ViewBigInt;
  };
  tickSize: number;
  minPrice: number;
  maxPrice: number;
  // …add any other driving inputs you need
}

export interface AuctionStats {
  auctionParameters: AuctionParameters;
  completionSeconds: number;
  clearPrice: {
    dollarAmount: ViewBigInt;
    tokenAmount: ViewBigInt;
  };
}

export function useLeverageTokenAuctionStats(_tokenAddress?: Address): Displayable<AuctionStats> {
  // for now, we return a static mock
  const mock: AuctionStats = {
    auctionParameters: {
      reservePrice: {
        tokenAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: 2_000n * 10n ** 6n,
          decimals: 6,
          symbol: "USDC",
        }),
        dollarAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: 3_000n * 10n ** 6n,
          decimals: 8,
          symbol: "$",
        }),
      },
      tickSize: 0.01,
      minPrice: 8.5,
      maxPrice: 12.5,
    },
    completionSeconds: 3_600, // e.g. 1 hour
    clearPrice: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 2_000n * 10n ** 6n,
        decimals: 6,
        symbol: "USDC",
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 3_000n * 10n ** 6n,
        decimals: 8,
        symbol: "$",
      }),
    },
  };

  return {
    data: mock,
    isLoading: false,
    isError: false,
    isFetched: true,
  };
}
