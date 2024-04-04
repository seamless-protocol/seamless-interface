import React from "react";
import { Address } from "viem";
import { DisplayPercentage } from "@shared";
import { useFetchViewSupplyApy } from "../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewStrategyApy } from "../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { StrategyData, ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";

interface AssetApyProps {
  asset: Address;
  isStrategy: boolean;
}

const StrategyApy: React.FC<{ asset: Address }> = ({ asset }) => {
  const strategies = ilmAssetStrategiesMap.get(asset) as StrategyData[];
  const { isLoading, isFetched, data: apy } = useFetchViewStrategyApy(strategies[strategies?.length - 1].address);

  return (
    <DisplayPercentage isLoading={isLoading} isFetched={isFetched} viewValue={apy?.viewValue} symbol={apy?.symbol} />
  );
};

const LendingApy: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    isLoading,
    isFetched,
    data: { apy },
  } = useFetchViewSupplyApy(asset);

  return <DisplayPercentage isLoading={isLoading} isFetched={isFetched} {...apy} />;
};

export const AssetApy: React.FC<AssetApyProps> = ({ asset, isStrategy }) => {
  return isStrategy ? <StrategyApy asset={asset} /> : <LendingApy asset={asset} />;
};
