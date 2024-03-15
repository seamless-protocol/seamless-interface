import React from "react";
import { AmountInput } from "./AmountInput";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { ilmStrategies } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { Address } from "viem";
import { useFetchViewMaxUserAssets } from "../../../../../state/loop-strategy/hooks/useFetchViewMaxUserAssets";

export enum StrategyAction {
  Deposit,
  Withdraw,
}

interface AmountInputBoxWrapperProps {
  id: number;
  action: StrategyAction;
  debouncedAmountInUsd: number;
}

function getAssetDataFromAction(
  strategyId: number,
  action: StrategyAction
): { symbol: string; logo: string; assetAddress: Address } {
  const strategyConfig = ilmStrategies[strategyId];

  const {
    symbol,
    logo,
    address: assetAddress,
  } = action === StrategyAction.Deposit
    ? strategyConfig.underlyingAsset
    : strategyConfig;

  return {
    symbol,
    logo,
    assetAddress,
  };
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  id,
  action,
  debouncedAmountInUsd,
}) => {
  const { symbol, logo, assetAddress } = getAssetDataFromAction(id, action);

  // TODO: properly invallidate query!!!
  const {
    data: { balance },
  } = useFetchViewAssetBalance(assetAddress);

  const { data: maxAssets } = useFetchViewMaxUserAssets(
    ilmStrategies[id].address,
    action
  );

  return (
    <AmountInput
      walletBalance={balance}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={symbol}
      assetLogo={logo}
      maxAssets={maxAssets}
    />
  );
};
