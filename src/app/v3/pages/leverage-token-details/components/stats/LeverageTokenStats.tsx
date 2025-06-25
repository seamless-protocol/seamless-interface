// src/components/LeverageTokenStats.tsx
import React from "react";
import { Displayable, DisplayMoney, DisplayText, Typography } from "@shared";
import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { useFetchLeverageRatios } from "../../../../../data/leverage-tokens/queries/collateral-ratios/leverage-ratios.hook";
import { useFetchFormattedAssetPrice } from "../../../../../data/common/queries/AssetPrice.hook";
import { useFetchLeverageTokenByAddress } from "../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useFetchLeverageTokenCollateral } from "../../../../../data/leverage-tokens/queries/collateral/collateral.hook";

const skeletonLoaderSettings = { width: "120px", height: "30px" };

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStats: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const { data: leverageRatios, ...restLeverageRatios } = useFetchLeverageRatios(leverageToken?.data?.address);

  const { data: leverageTokenData, ...restLeverageTokenData } = useFetchLeverageTokenByAddress(
    leverageToken?.data?.address
  );

  const { data: leverageTokenPrice, ...restLeverageTokenPrice } = useFetchFormattedAssetPrice(
    leverageToken?.data?.address
  );

  const { data: collateral, ...restCollateral } = useFetchLeverageTokenCollateral(leverageToken?.data?.address);

  return (
    <div className="w-full rounded-card bg-neutral-0 overflow-hidden py-3">
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
              {...leverageTokenData?.tvl?.dollarAmount}
              {...restLeverageTokenData}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...leverageTokenData?.tvl?.tokenAmount}
              {...restLeverageTokenData}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
              symbolPosition="after"
            />
          </div>
        </div>

        {/* 2. Collateral */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Leverage Token Collateral
          </Typography>
          <div className="flex flex-col gap-1">
            <DisplayMoney
              {...collateral?.dollarAmount}
              {...restCollateral}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...collateral?.tokenAmount}
              {...restCollateral}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
              symbolPosition="after"
            />
          </div>
        </div>

        {/* 3. Price */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Leverage Token Price
          </Typography>
          <DisplayMoney
            {...leverageTokenPrice}
            {...restLeverageTokenPrice}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </div>

        {/* 4. Target Leverage */}
        <div className="p-6 flex flex-col justify-between min-h-[80px]">
          <Typography type="medium3" className="text-primary-600">
            Target leverage
          </Typography>
          <DisplayText
            {...leverageRatios?.targetLeverage}
            {...restLeverageRatios}
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
