// src/components/LeverageTokenAuctionStats.tsx
import React from "react";
import { FlexCol, FlexRow, Typography, DisplayMoney } from "@shared";
import border from "@assets/common/border.svg";
import { useLeverageTokenAuctionStats } from "../../hooks/useLeverageTokenAuctionStats";
import { Address } from "viem";

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export interface LeverageTokenAuctionStatsProps {
  tokenAddress?: Address;
}

export const LeverageTokenAuctionStats: React.FC<LeverageTokenAuctionStatsProps> = ({ tokenAddress }) => {
  const { data: stats, ...rest } = useLeverageTokenAuctionStats(tokenAddress);

  const { auctionParameters, completionSeconds, clearPrice } = stats;

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      {/* Auction inputs */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Reserve Price
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...auctionParameters.reservePrice.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...auctionParameters.reservePrice.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>

      {/* Completion time */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Completion Time
          </Typography>
          <Typography type="bold5" className="text-primary-1000">
            {Math.floor(completionSeconds / 3600)}h {Math.floor((completionSeconds % 3600) / 60)}m
          </Typography>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>

      {/* Clear price */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Clear Price
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...clearPrice.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...clearPrice.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
