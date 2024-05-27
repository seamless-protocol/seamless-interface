import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Address } from "viem";
import { FlexRow } from "../../containers/FlexRow";
import { Typography } from "../../text/Typography/Typography";
import { RHFInputSliderField } from "./RHFInputSliderField";

export interface StrategyData {
  address: Address;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

export interface StrategySelectorProps {
  strategies?: StrategyData[];
  name: string;
  strategyAddressFieldName: string;
}

export const RHFStrategySelector: React.FC<StrategySelectorProps> = ({
  strategies,
  name,
  strategyAddressFieldName,
}) => {
  const { watch, control, setValue } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    setValue(strategyAddressFieldName, strategies?.[value].address);
  }, [value, strategies, setValue, strategyAddressFieldName]);

  if (strategies == null || strategies?.length <= 1) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            <RHFInputSliderField {...field} min="0" max={strategies.length - 1} enabledMax={strategies.length - 1} />
            <FlexRow className="justify-between pl-1">
              {strategies.map((strategy) => (
                <Typography key={strategy.address} type="medium3">
                  {strategy.targetMultiple.value}
                  {strategy.targetMultiple.symbol}
                </Typography>
              ))}
            </FlexRow>
          </>
        );
      }}
    />
  );
};
