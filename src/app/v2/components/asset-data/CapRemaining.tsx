import { DisplayText, DisplayTextProps } from "@shared";
import React from "react";
import { useFetchViewDetailTotalSupplied } from "../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewStrategyRemainingCap } from "../../../state/loop-strategy/queries/useFetchStrategyRemainingCap";
import { Address } from "viem";
import { getIsStrategy } from "../../../state/settings/configUtils";

export const CapRemaining: React.FC<{
  asset?: Address;
  subStrategy?: Address;
  textProps?: DisplayTextProps;
}> = ({ asset, subStrategy, textProps }) => {
  return getIsStrategy(asset) ? (
    <StrategyRemainingCap asset={subStrategy} {...textProps} />
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
      viewValue={`${remainingCap?.capacityRemainingPercentage?.viewValue || ""}% cap available`}
      {...rest}
      {...textProps}
      typography="medium1"
      className="text-primary-600"
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
      viewValue={`${remainingCap?.remainingCapPercentage?.viewValue || ""}% cap available`}
      {...rest}
      {...textProps}
      typography="medium1"
      className="text-primary-600"
    />
  );
};
