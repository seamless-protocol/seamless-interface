import React from "react";
import { AmountInput } from "./AmountInput";
import { Address } from "viem";
import { useFetchAssetBalance } from "../../../../../state/common/hooks/useFetchAssetBalance";

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
  const { balance: walletBalance } = useFetchAssetBalance(assetAddress);

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
