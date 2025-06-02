// src/components/LeverageTokenAuctionStats.tsx
import React from "react";
import { DisplayText, Displayable, formatFetchBigIntToViewBigInt, ViewBigInt, ViewNumber, FlexCol } from "@shared";
import { Address } from "viem";
import { StatCell } from "./StatsCell";

const skeletonLoaderSettings = { width: "120px", height: "30px" };

export interface AuctionParameters {
  reservePrice: {
    dollarAmount: ViewBigInt;
    tokenAmount: ViewBigInt;
  };
  tickSize: number;
  minPrice: number;
  maxPrice: number;
  // New mock fields
  minLeverage: ViewNumber; // e.g. 16.9x
  maxLeverage: ViewNumber; // e.g. 17.3x
  mintTokenFee: ViewNumber; // e.g. 0%
  redeemTokenFee: ViewNumber; // e.g. 0.1%
  dutchAuctionDuration: ViewNumber; // e.g. 1h
  dutchAuctionInitialPriceMultiplier: ViewNumber; // e.g. 1.01
  dutchAuctionMinPriceMultiplier: ViewNumber; // e.g. 0.999
  preLiquidationCollateralRatio: ViewNumber; // e.g. 1.06061
  preLiquidationRebalanceReward: ViewNumber; // e.g. 0.501
}

export interface AuctionStats {
  auctionParameters: AuctionParameters;
  completionSeconds: number;
  clearPrice: {
    dollarAmount: ViewBigInt;
    tokenAmount: ViewBigInt;
  };
}

/**
 * Mock hook for auction stats with 9 fields + original params
 */
export function useLeverageTokenAuctionStats(_tokenAddress?: Address): Displayable<AuctionStats> {
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
      minLeverage: { viewValue: "16.9", symbol: "x" },
      maxLeverage: { viewValue: "17.3", symbol: "x" },
      mintTokenFee: { viewValue: "0", symbol: "%" },
      redeemTokenFee: { viewValue: "0.1", symbol: "%" },
      dutchAuctionDuration: { viewValue: "1", symbol: "h" },
      dutchAuctionInitialPriceMultiplier: { viewValue: "1.01" },
      dutchAuctionMinPriceMultiplier: { viewValue: "0.999" },
      preLiquidationCollateralRatio: { viewValue: "1.06061" },
      preLiquidationRebalanceReward: { viewValue: "0.501" },
    },
    completionSeconds: 3_600,
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

export interface LeverageTokenAuctionStatsProps {
  tokenAddress?: Address;
}

export const LeverageTokenStatsAdditional: React.FC<LeverageTokenAuctionStatsProps> = ({ tokenAddress }) => {
  const { data: stats, ...rest } = useLeverageTokenAuctionStats(tokenAddress);
  const { auctionParameters } = stats;

  return (
    <FlexCol className="w-full rounded-card bg-neutral-0 overflow-hidden p-4">
      <div
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x 
      divide-neutral-200 border-b border-solid border-neutral-200"
      >
        <StatCell label="Min Leverage (Max Collateral Ratio)">
          <DisplayText
            {...(auctionParameters.minLeverage as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Max Leverage (Min Collateral Ratio)">
          <DisplayText
            {...(auctionParameters.maxLeverage as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Mint Token Fee">
          <DisplayText
            {...(auctionParameters.mintTokenFee as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x 
      divide-neutral-200 border-b border-solid border-neutral-200"
      >
        <StatCell label="Redeem Token Fee">
          <DisplayText
            {...(auctionParameters.redeemTokenFee as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Dutch Auction Duration">
          <DisplayText
            {...(auctionParameters.dutchAuctionDuration as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Dutch Auction Initial Price Multiplier">
          <DisplayText
            {...(auctionParameters.dutchAuctionInitialPriceMultiplier as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x 
      divide-neutral-200"
      >
        <StatCell label="Dutch Auction Min Price Multiplier">
          <DisplayText
            {...(auctionParameters.dutchAuctionMinPriceMultiplier as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Pre-liquidation Collateral Ratio">
          <DisplayText
            {...(auctionParameters.preLiquidationCollateralRatio as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>

        <StatCell label="Pre-liquidation Rebalance Reward">
          <DisplayText
            {...(auctionParameters.preLiquidationRebalanceReward as ViewNumber)}
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </StatCell>
      </div>
    </FlexCol>
  );
};
