import React from "react";
import { Address } from "viem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DisplayPercentage, DisplayPercentageProps, FlexRow, Tooltip, Typography } from "@shared";
import { useFetchViewSupplyApy } from "../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewStrategyApy } from "../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { StrategyData, ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";

interface AssetApyProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
  showWarning?: boolean;
}

interface StrategyApyProps extends DisplayPercentageProps {
  asset: Address;
  showWarning?: boolean;
}

export const StrategyApy: React.FC<StrategyApyProps> = ({ asset, showWarning = true, ...rest }) => {
  const strategies = ilmAssetStrategiesMap.get(asset) as StrategyData[];
  // todo remove 0x1
  const {
    isLoading,
    isFetched,
    data: apy,
  } = useFetchViewStrategyApy(strategies ? strategies[strategies?.length - 1].address : "0x1");

  if (showWarning && apy.value === 0 && !isLoading && isFetched) {
    return (
      <FlexRow className="gap-1">
        <DisplayPercentage isLoading={isLoading} isFetched={isFetched} viewValue="~" symbol={apy?.symbol} {...rest} />
        <Tooltip tooltip={<Typography type="description">Not enough data</Typography>} size="small" theme="dark">
          <ExclamationTriangleIcon className="cursor-pointer" width={15} />
        </Tooltip>
      </FlexRow>
    );
  }

  return (
    <DisplayPercentage
      isLoading={isLoading}
      isFetched={isFetched}
      viewValue={apy?.value === 0 ? "~" : apy?.viewValue}
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
