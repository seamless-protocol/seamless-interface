import React from "react";
import { Address } from "viem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DisplayPercentage, DisplayPercentageProps, DisplayText, FlexRow, Tooltip, Typography } from "@shared";
import { useFetchViewSupplyApy } from "../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewStrategyApy } from "../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { StrategyData, ilmAssetStrategiesMap } from "../../state/loop-strategy/config/StrategyConfig";
import { WETH_ADDRESS } from "../../../meta";

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
    data: apy,
    ...restStrategyApy
  } = useFetchViewStrategyApy(strategies ? strategies[strategies?.length - 1].address : "0x1");

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

  if (asset === WETH_ADDRESS) {
    return <DisplayText {...restStrategyApy} {...rest} text="Up to 1.5x" />
  }

  return (
    <DisplayPercentage
      {...restStrategyApy}
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
