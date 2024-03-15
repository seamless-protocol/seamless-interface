import React from "react";
import { AmountInput } from "./AmountInput";
import { Address } from "viem";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { walletBalanceDecimalsOptions } from "../../../../../../shared/meta";

interface AmountInputBoxWrapperProps {
  assetAddress: Address;
  debouncedAmountInUsd: number;
  assetSymbol: string;
  assetLogo: string;
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  assetAddress,
  debouncedAmountInUsd,
  assetSymbol,
  assetLogo,
}) => {
  // TODO: properly invallidate query!!!
  const {
    data: { balance },
  } = useFetchViewAssetBalance(assetAddress, walletBalanceDecimalsOptions);

  return (
    <AmountInput
      walletBalance={balance}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={assetSymbol}
      assetLogo={assetLogo}
    />
  );
};

export default AmountInputWrapper;
