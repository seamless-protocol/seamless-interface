import { DisplayText, DisplayTextProps } from "@shared";
import React from "react";
import { useFetchViewDetailTotalSupplied } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewStrategyRemainingCap } from "../../../../../state/loop-strategy/queries/useFetchStrategyRemainingCap";
import { Address } from "viem";
import { StrategyState, LendMarketState } from "../../../../../state/common/types/StateTypes";

export const CapRemaining: React.FC<{
  assetState: StrategyState | LendMarketState | undefined;
  textProps?: DisplayTextProps;
}> = ({
  assetState,
  textProps = {
    typography: "medium2",
  },
}) => {
  return assetState?.isStrategy ? (
    <StrategyRemainingCap asset={(assetState as StrategyState).subStrategyData[0].address} {...textProps} />
  ) : (
    <RemainingCap asset={assetState?.address} {...textProps} />
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
