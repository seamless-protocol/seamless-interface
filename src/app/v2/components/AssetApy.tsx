import React from "react";
import { Address } from "viem";
import { DisplayPercentage, DisplayPercentageProps } from "@shared";
import { useFetchViewSupplyApy } from "../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewStrategyApy } from "../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { StrategyData, ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";

interface AssetApyProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
}

const StrategyApy: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const strategies = ilmAssetStrategiesMap.get(asset) as StrategyData[];
  const { isLoading, isFetched, data: apy } = useFetchViewStrategyApy(strategies[strategies?.length - 1].address);

  return (
    <DisplayPercentage
      isLoading={isLoading}
      isFetched={isFetched}
      viewValue={apy?.viewValue}
      symbol={apy?.symbol}
      {...rest}
    />
  );
};

const LendingApy: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const {
    isLoading,
    isFetched,
    data: { apy },
  } = useFetchViewSupplyApy(asset);

  return <DisplayPercentage isLoading={isLoading} isFetched={isFetched} {...rest} {...apy} />;
};

export const AssetApy: React.FC<AssetApyProps> = ({ asset, isStrategy, ...rest }) => {
  return isStrategy ? <StrategyApy asset={asset} {...rest} /> : <LendingApy asset={asset} {...rest} />;
};
