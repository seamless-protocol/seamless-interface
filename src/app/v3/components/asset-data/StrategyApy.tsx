import React from "react";
import { Address } from "viem";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DisplayPercentage, DisplayPercentageProps, FlexRow, Tooltip, Typography } from "@shared";
import { useFetchViewStrategyApy } from "../../../statev3/loop-strategy/hooks/useFetchViewStrategyApy";

interface StrategyApyProps extends DisplayPercentageProps {
  subStrategy?: Address;
  showWarning?: boolean;
}

export const StrategyApy: React.FC<StrategyApyProps> = ({ subStrategy, showWarning = true, ...rest }) => {
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
