import { DisplayValue, FlexRow, Icon, Typography, useFullTokenData } from "@shared";
import React from "react";
import { StrategyConfig } from "src/app/state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "src/app/state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { TokenDescriptionDict } from "src/shared/state/meta-data-queries/useTokenDescription";
import { Address } from "viem";

export const StrategySummary: React.FC<{
  strategy: StrategyConfig;
  asset: Address;
  amount?: string;
}> = ({ strategy, asset, amount }) => {
  const {
    data: targetMultiple,
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
  } = useFetchViewTargetMultiple(strategy.address);

  const { data: tokenData } = useFullTokenData(asset);

  const { data: strategyTokenData } = useFullTokenData(strategy.address);

  return (
    <div>
      <LocalRow label="Action">Deposit</LocalRow>
      <LocalRow label="Strategy">{TokenDescriptionDict[asset]?.strategyTitle}</LocalRow>
      <LocalRow label="Multiplier">
        <DisplayValue {...targetMultiple} isLoading={isTargetMultipleLoading} isFetched={isTargetMultipleFetched} />
      </LocalRow>
      <LocalRow label="Starting Asset">{tokenData.symbol}</LocalRow>
      <LocalRow label="Deposit Size">
        <FlexRow className="gap-2 items-center">
          {`${amount} ${tokenData.symbol}`}
          <Icon src={tokenData?.logo} alt={tokenData?.shortName || ""} width={16} />
        </FlexRow>
      </LocalRow>
      <LocalRow label="Ending Asset">{strategyTokenData.symbol}</LocalRow>
    </div>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
