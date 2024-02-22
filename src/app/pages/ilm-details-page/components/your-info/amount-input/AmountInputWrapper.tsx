import React from "react";
import { AmountInput } from "./AmountInput";
import { useFetchAccountAssetBalance } from "../../../../../state/common/hooks/useFetchAccountAssetBalance";
import { Address } from "viem";

interface AmountInputBoxWrapperProps {
  assetAddress: Address;
  debouncedAmountInUsd: number;
  assetSymbol: string;
  assetLogo: any;
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  assetAddress,
  debouncedAmountInUsd,
  assetSymbol,
  assetLogo,
}) => {
  // TODO: properly invallidate query!!!
  const { balance: walletBalance } = useFetchAccountAssetBalance(assetAddress);

  return (
    <AmountInput
      walletBalance={walletBalance}
      debouncedAmountInUsd={debouncedAmountInUsd}
      assetSymbol={assetSymbol}
      assetLogo={assetLogo}
    />
  );
};

export default AmountInputWrapper;
