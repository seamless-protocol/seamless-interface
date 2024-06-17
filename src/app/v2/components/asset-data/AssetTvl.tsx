import React from "react";
import { Address } from "viem";
import { DisplayMoney, DisplayPercentageProps } from "@shared";
import { useFetchViewDetailTotalSupplied } from "../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewDetailEquity } from "../../../state/loop-strategy/queries/useFetchViewEquity";

interface AssetTvlProps extends DisplayPercentageProps {
  asset?: Address;
  subStrategy?: Address;
  isStrategy?: boolean;
}

const StrategyTvl: React.FC<{ subStrategy?: Address }> = ({ subStrategy, ...rest }) => {
  const {
    data: { dollarAmount },
    ...restEquity
  } = useFetchViewDetailEquity(subStrategy);

  return <DisplayMoney {...restEquity} {...dollarAmount} {...rest} />;
};

const LendingTvl: React.FC<{ asset?: Address }> = ({ asset, ...rest }) => {
  const {
    data: {
      totalSupplied: { dollarAmount },
    },
    ...restSupplied
  } = useFetchViewDetailTotalSupplied(asset);

  return <DisplayMoney {...restSupplied} {...rest} {...dollarAmount} />;
};

export const AssetTvl: React.FC<AssetTvlProps> = ({ asset, subStrategy, isStrategy, ...rest }) => {
  return isStrategy ? <StrategyTvl subStrategy={subStrategy} {...rest} /> : <LendingTvl asset={asset} {...rest} />;
};
