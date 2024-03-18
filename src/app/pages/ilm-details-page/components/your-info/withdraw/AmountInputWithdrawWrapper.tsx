import React from "react";
import { AmountInput } from "../amount-input/AmountInput";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { ilmStrategies } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { walletBalanceDecimalsOptions } from "../../../../../meta";

interface AmountInputWithdrawWrapperProps {
  id: number;
  debouncedAmountInUsd: number;
}

export const AmountInputWithdrawWrapper: React.FC<
  AmountInputWithdrawWrapperProps
> = ({ id, debouncedAmountInUsd }) => {
  const { symbol, logo, address: assetAddress } = ilmStrategies[id];

  // TODO: properly invallidate query!!!
  const {
    data: { balance },
  } = useFetchViewAssetBalance(assetAddress, walletBalanceDecimalsOptions);

  return (
    <AmountInput
      walletBalance={balance}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={symbol}
      assetLogo={logo}
      maxAssets={balance}
    />
  );
};

export default AmountInputWithdrawWrapper;
