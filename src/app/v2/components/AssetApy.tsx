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

interface StrategyApyProps extends DisplayPercentageProps {
  asset: Address;
}

export const StrategyApy: React.FC<StrategyApyProps> = ({ asset, ...rest }) => {
  const strategies = ilmAssetStrategiesMap.get(asset) as StrategyData[];
  // todo remove 0x1
  const {
    isLoading,
    isFetched,
    data: apy,
  } = useFetchViewStrategyApy(strategies ? strategies[strategies?.length - 1].address : "0x1");

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

interface LandingApyProps extends DisplayPercentageProps {
  asset: Address;
}

export const LendingApy: React.FC<LandingApyProps> = ({ asset, ...rest }) => {
  const {
    data: { apy },
    ...apyRest
  } = useFetchViewSupplyApy(asset);

  return <DisplayPercentage {...apyRest} {...rest} {...apy} />;
};

export const AssetApy: React.FC<AssetApyProps> = ({ asset, isStrategy, ...rest }) => {
  return isStrategy ? <StrategyApy asset={asset} {...rest} /> : <LendingApy asset={asset} {...rest} />;
};
