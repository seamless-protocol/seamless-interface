import { RHFInputSliderField, FlexRow, Typography, DisplayTargetMultiple, FlexCol } from "@shared";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ilmAssetStrategiesMap, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "../../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { Address } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";

export interface StrategyData {
  address: Address;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

export interface StrategySelectorProps {
  name: string;
  strategy: StrategyConfig;
}

export const RHFStrategySelector: React.FC<StrategySelectorProps> = ({ name, strategy }) => {
  const strategies = ilmAssetStrategiesMap.get(strategy.underlyingAsset.address);

  const { ...restTargetMultiple } = useFetchViewTargetMultiple(strategy.address);
  const { setSubStrategy, asset } = useFormSettingsContext();

  const { watch, control } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    setSubStrategy(strategies?.[value]?.address);
  }, [value, asset]);

  return (
    <FlexCol className="gap-4">
      <FlexRow className="justify-between pr-2">
        <Typography type="bold3">Target Multiple</Typography>
        <DisplayTargetMultiple
          typography="bold3"
          {...restTargetMultiple}
          viewValue={`${strategies?.[value]?.targetMultiple.value}`}
          symbol={`${strategies?.[value]?.targetMultiple.symbol}`}
        />
      </FlexRow>
      {strategies != null && strategies.length > 1 && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                <RHFInputSliderField {...field} min="0" max={strategies.length - 1} />
                <FlexRow className="justify-between pl-1 mt-[-20px]">
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
      )}
    </FlexCol>
  );
};
