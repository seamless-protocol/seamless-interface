import React from "react";
import { Address } from "viem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DisplayPercentage, DisplayPercentageProps, FlexRow, Tooltip, Typography } from "@shared";
import { useFetchViewSupplyApy } from "../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewMaxStrategyApy } from "../../state/loop-strategy/hooks/useFetchViewMaxStrategyApy";
import { ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";

interface AssetApyProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
  showWarning?: boolean;
}

interface StrategyApyProps extends DisplayPercentageProps {
  strategy: Address;
  showWarning?: boolean;
}

export const StrategyApy: React.FC<StrategyApyProps> = ({ strategy, showWarning = true, ...rest }) => {
  const { data: apy, ...restStrategyApy } = useFetchViewMaxStrategyApy(strategy);

  const strategiesData = strategy ? ilmAssetStrategiesMap.get(strategy) || [] : [];

  if (showWarning && apy.value === 0 && !restStrategyApy.isLoading && restStrategyApy.isFetched) {
    return (
      <FlexRow className="gap-1">
        <DisplayPercentage {...restStrategyApy} viewValue="~" symbol={apy?.symbol} {...rest} />
        <Tooltip tooltip={<Typography type="description">Not enough data</Typography>} size="small" theme="dark">
          <ExclamationTriangleIcon className="cursor-pointer" width={15} />
        </Tooltip>
      </FlexRow>
    );
  }

  return (
    <DisplayPercentage
      {...restStrategyApy}
      viewValue={`${strategiesData?.length > 1 ? "Up to " : ""}${apy?.value === 0 ? "~" : apy?.viewValue}`}
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
  return isStrategy ? <StrategyApy strategy={asset} {...rest} /> : <LendingApy asset={asset} {...rest} />;
};
