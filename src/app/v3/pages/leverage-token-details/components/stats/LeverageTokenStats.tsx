// src/components/LeverageTokenStats.tsx
import React from "react";
import { Displayable, DisplayMoney, DisplayText, Typography } from "@shared";
import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

const skeletonLoaderSettings = { width: "120px", height: "30px" };

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStats: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const { data: { tvl, currentMultiple } = {}, ...rest } = leverageToken;

  return (
    <div className="w-full rounded-card bg-neutral-0 overflow-hidden">
      <div
        className="
          grid grid-cols-1 md:grid-cols-4
          divide-y divide-neutral-200
          md:divide-y-0 md:divide-x
        "
      >
        {/* 1. TVL */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Leverage Token TVL
          </Typography>
          <div className="flex flex-col gap-1">
            <DisplayMoney
              {...tvl?.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...tvl?.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </div>
        </div>

        {/* 2. Price */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Leverage Token Price
          </Typography>
          <DisplayMoney
            viewValue="1.1" // replace with real price fetch
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </div>

        {/* 3. Current Leverage */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Current leverage
          </Typography>
          <DisplayText
            {...rest}
            {...currentMultiple}
            typography="bold5"
            className="text-primary-1000"
            symbolPosition="after"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </div>

        {/* 4. Target Leverage */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Target leverage
          </Typography>
          <DisplayText
            viewValue="17x" // or pull from config
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            symbolPosition="after"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </div>
      </div>
    </div>
  );
};
