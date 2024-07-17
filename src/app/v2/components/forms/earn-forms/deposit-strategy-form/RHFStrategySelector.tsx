import { RHFInputSliderField, FlexRow, Typography, DisplayTargetMultiple, FlexCol } from "@shared";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Address } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { StrategyState } from "../../../../../state/common/types/StateTypes";

export interface StrategyData {
  address: Address;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

export interface StrategySelectorProps {
  name: string;
  strategy: StrategyState;
}

export const RHFStrategySelector: React.FC<StrategySelectorProps> = ({ name, strategy }) => {
  const { setSubStrategy, asset, setTargetMultiply } = useFormSettingsContext();

  const { watch, control } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    setSubStrategy(strategy?.subStrategyData?.[value]?.address || undefined);
    setTargetMultiply(
      strategy?.multiplier
        ? `Up To ${strategy?.subStrategyData?.[value]?.targetMultiple.value}${strategy?.subStrategyData?.[value]?.targetMultiple.symbol}`
        : undefined
    );
  }, [value, asset]);

  return (
    <FlexCol className="gap-4">
      <FlexRow className="justify-between pr-2">
        <Typography type="bold3">Target Multiple</Typography>
        <DisplayTargetMultiple
          typography="bold3"
          viewValue={`${strategy?.subStrategyData?.[value]?.targetMultiple.value}`}
          symbol={`${strategy?.subStrategyData?.[value]?.targetMultiple.symbol}`}
        />
      </FlexRow>
      {strategy?.subStrategyData != null && strategy?.subStrategyData.length > 1 && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                <RHFInputSliderField {...field} min="0" max={(strategy?.subStrategyData?.length || 0) - 1 || 0} />
                <FlexRow className="justify-between pl-1 mt-[-20px]">
                  {strategy?.subStrategyData?.map((strategy) => (
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
      )}
    </FlexCol>
  );
};
