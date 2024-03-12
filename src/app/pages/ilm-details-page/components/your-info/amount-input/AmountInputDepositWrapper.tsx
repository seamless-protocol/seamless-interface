import React from "react";
import { AmountInput } from "./AmountInput";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { useFetchViewMaxUserDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import { ilmStrategies } from "../../../../../state/loop-strategy/config/StrategyConfig";

interface AmountInputDepositWrapperProps {
  id: number;
  debouncedAmountInUsd: number;
}

export const AmountInputDepositWrapper: React.FC<
  AmountInputDepositWrapperProps
> = ({ id, debouncedAmountInUsd }) => {
  const {
    address: strategy,
    underlyingAsset: { address: assetAddress, symbol, logo },
  } = ilmStrategies[id];

  // TODO: properly invallidate query!!!
  const {
    data: { balance },
  } = useFetchViewAssetBalance(assetAddress);

  const { data: maxUserDeposit } = useFetchViewMaxUserDeposit(strategy);

  return (
    <AmountInput
      walletBalance={balance}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={symbol}
      assetLogo={logo}
      maxAssets={maxUserDeposit}
    />
  );
};

export default AmountInputDepositWrapper;
