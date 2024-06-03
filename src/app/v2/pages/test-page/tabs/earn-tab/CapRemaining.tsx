import { DisplayText, DisplayTextProps } from "@shared";
import React from "react";
import { useFetchViewDetailTotalSupplied } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewStrategyRemainingCap } from "../../../../../state/loop-strategy/queries/useFetchStrategyRemainingCap";
import { Address } from "viem";

export const CapRemaining: React.FC<{
  asset?: Address;
  isStrategy?: boolean;
  textProps?: DisplayTextProps;
}> = ({
  asset,
  isStrategy,
  textProps = {
    typography: "medium2",
  },
}) => {
    return isStrategy ? (
      <StrategyRemainingCap asset={asset} {...textProps} />
    ) : (
      <RemainingCap asset={asset} {...textProps} />
    );
  };

export const RemainingCap: React.FC<{
  asset?: Address;
  textProps?: DisplayTextProps;
}> = ({ asset, textProps }) => {
  const { data: remainingCap, ...rest } = useFetchViewDetailTotalSupplied(asset);

  return (
    <DisplayText
      viewValue={`${remainingCap?.capacityRemainingPercentage?.viewValue || ""}% cap remaining`}
      {...rest}
      {...textProps}
    />
  );
};

export const StrategyRemainingCap: React.FC<{
  asset?: Address;
  textProps?: DisplayTextProps;
}> = ({ asset, textProps }) => {
  const { data: remainingCap, ...rest } = useFetchViewStrategyRemainingCap(asset);

  return (
    <DisplayText
      viewValue={`${remainingCap?.remainingCapPercentage?.viewValue || ""}% cap remaining`}
      {...rest}
      {...textProps}
    />
  );
};
