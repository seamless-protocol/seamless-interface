import React from "react";
import { AmountInput } from "./AmountInput";
import { useFetchAccountAssetBalance } from "../../../../../state/common/hooks/useFetchAccountAssetBalance";
import { Address } from "viem";

interface AmountInputBoxWrapperProps {
  assetAddress: Address;
  debouncedAmountInUsd: number;
  isDepositSuccessful: boolean;
  assetSymbol: string;
  assetLogo: any;
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  assetAddress,
  debouncedAmountInUsd,
  isDepositSuccessful,
  assetSymbol,
  assetLogo,
}) => {
  // TODO: properly invallidate query!!!
  const { balance: walletBalance } = useFetchAccountAssetBalance(
    assetAddress,
    isDepositSuccessful
  );

  return (
    <AmountInput
      walletBalance={walletBalance || 0n}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={assetSymbol}
      assetLogo={assetLogo}
    />
  );
};

export default AmountInputWrapper;
