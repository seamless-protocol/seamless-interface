import React from "react";
import { Address } from "viem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DisplayPercentage, DisplayPercentageProps, FlexRow, Tooltip, Typography } from "@shared";
import { useFetchViewSupplyApy } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewMaxStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewMaxStrategyApy";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";

interface AssetApyProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
  showWarning?: boolean;
}

interface StrategyApyProps extends DisplayPercentageProps {
  strategy: Address;
  showWarning?: boolean;
}

export const MaxStrategyApy: React.FC<StrategyApyProps> = ({ strategy, showWarning = true, ...rest }) => {
  const { data: apy, ...restStrategyApy } = useFetchViewMaxStrategyApy(strategy);

  if (showWarning && apy.value === 0 && !restStrategyApy.isLoading && restStrategyApy.isFetched) {
    return (
      <Tooltip tooltip={<Typography type="description">Not enough data</Typography>} size="small" theme="dark">
        <FlexRow className="gap-1">
          <DisplayPercentage {...restStrategyApy} viewValue="~" symbol={apy?.symbol} {...rest} />
          <ExclamationTriangleIcon className="cursor-pointer" width={15} />
        </FlexRow>
      </Tooltip>
    );
  }

  return (
    <DisplayPercentage
      {...restStrategyApy}
      viewValue={`${apy?.value === 0 ? "~" : apy?.viewValue}`}
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

interface SubStrategyApyProps extends DisplayPercentageProps {
  subStrategy: Address;
  showWarning?: boolean;
}

export const SubStrategyApy: React.FC<SubStrategyApyProps> = ({ subStrategy, showWarning = true, ...rest }) => {
  const { data: apy, ...restApy } = useFetchViewStrategyApy(subStrategy);

  if (showWarning && apy.value === 0 && !restApy.isLoading && restApy.isFetched) {
    return (
      <Tooltip tooltip={<Typography type="description">Not enough data</Typography>} size="small" theme="dark">
        <FlexRow className="gap-1">
          <DisplayPercentage {...restApy} viewValue="~" symbol={apy?.symbol} {...rest} />
          <ExclamationTriangleIcon className="cursor-pointer" width={15} />
        </FlexRow>
      </Tooltip>
    );
  }

  return (
    <DisplayPercentage
      {...restApy}
      viewValue={`${apy?.value === 0 ? "~" : apy?.viewValue}`}
      symbol={apy?.symbol}
      {...rest}
    />
  );
};

export const AssetApy: React.FC<AssetApyProps & { subStrategy?: Address }> = ({
  asset,
  isStrategy,
  subStrategy,
  ...rest
}) => {
  if (isStrategy) {
    return subStrategy ? (
      <SubStrategyApy subStrategy={subStrategy} {...rest} />
    ) : (
      <MaxStrategyApy strategy={asset} {...rest} />
    );
  }
  return <LendingApy asset={asset} {...rest} />;
};
