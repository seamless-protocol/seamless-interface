// src/components/LeverageTokenStats.tsx
import React from "react";
import { Displayable, DisplayMoney, DisplayText, Typography } from "@shared";
import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useFetchLeverageTokenState } from "../../../../../data/leverage-tokens/queries/leverage-token-state/leverage-token-state.hook";
import { useFetchLeverageRatios } from "../../../../../data/leverage-tokens/queries/collateral-ratios/leverage-ratios.hook";
import { useFetchLeverageTokenCollateral } from "../../../../../data/leverage-tokens/queries/collateral/collateral.hook";
import { useFetchFormattedAssetPrice } from "../../../../../statev3/queries/AssetPrice.hook";

const skeletonLoaderSettings = { width: "120px", height: "30px" };

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStats: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const { data: leverageTokenState, ...restLeverageTokenState } = useFetchLeverageTokenState(
    leverageToken?.data?.address
  );

  const { data: leverageRatios, ...restLeverageRatios } = useFetchLeverageRatios(leverageToken?.data?.address);

  const { data: leverageTokenCollateral, ...restLeverageTokenCollateral } = useFetchLeverageTokenCollateral(
    leverageToken?.data?.address
  );

  const { data: leverageTokenPrice, ...restLeverageTokenPrice } = useFetchFormattedAssetPrice(
    leverageToken?.data?.address
  );

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
              {...leverageTokenCollateral?.dollarAmount}
              {...restLeverageTokenCollateral}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...leverageTokenCollateral?.tokenAmount}
              {...restLeverageTokenCollateral}
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
            {...leverageTokenPrice}
            {...restLeverageTokenPrice}
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
            {...restLeverageTokenState}
            {...leverageTokenState?.currentLeverage}
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
