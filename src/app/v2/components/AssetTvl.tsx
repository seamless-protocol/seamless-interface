import React from "react";
import { Address } from "viem";
import { DisplayMoney, DisplayPercentageProps } from "@shared";
import { StrategyData, ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewDetailTotalSupplied } from "../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewDetailEquity } from "../../state/loop-strategy/queries/useFetchViewEquity";

interface AssetTvlProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
}

const StrategyTvl: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const strategies = ilmAssetStrategiesMap.get(asset) as StrategyData[];
  const {
    isLoading,
    isFetched,
    data: { dollarAmount },
  } = useFetchViewDetailEquity(strategies[strategies?.length - 1].address);

  return <DisplayMoney isLoading={isLoading} isFetched={isFetched} {...dollarAmount} {...rest} />;
};

const LendingTvl: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const {
    data: {
      totalSupplied: { dollarAmount },
    },
    isLoading,
    isFetched,
  } = useFetchViewDetailTotalSupplied(asset);

  return <DisplayMoney isLoading={isLoading} isFetched={isFetched} {...rest} {...dollarAmount} />;
};

export const AssetTvl: React.FC<AssetTvlProps> = ({ asset, isStrategy, ...rest }) => {
  return isStrategy ? <LendingTvl asset={asset} {...rest} /> : <LendingTvl asset={asset} {...rest} />;
};
