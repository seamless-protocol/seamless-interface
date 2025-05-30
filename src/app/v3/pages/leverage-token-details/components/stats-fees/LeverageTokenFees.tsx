import React from "react";
import { FlexCol, FlexRow, Typography, DisplayMoney, DisplayPercentage } from "@shared";
import border from "@assets/common/border.svg";
import { Address } from "viem";
import { useLeverageTokenFeeStats } from "../../hooks/useLeverageTokenFeeStats";

const skeletonLoaderSettings = { width: "120px", height: "30px" };

export interface LeverageTokenFeesProps {
  tokenAddress?: Address;
}

export const LeverageTokenFees: React.FC<LeverageTokenFeesProps> = ({ tokenAddress }) => {
  const { data: fees, ...rest } = useLeverageTokenFeeStats(tokenAddress);
  const { depositFee, withdrawFee, managementFeePercent } = fees;

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      {/* Deposit Fee */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Deposit Fee
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...depositFee.tokenFee}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...depositFee.treasuryFee}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>

      {/* Withdraw Fee */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Withdraw Fee
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...withdrawFee.tokenFee}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...withdrawFee.treasuryFee}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>

      {/* Management Fee */}
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600">
            Management Fee
          </Typography>
          <DisplayPercentage
            {...rest}
            {...managementFeePercent}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
      </FlexRow>
    </div>
  );
};
