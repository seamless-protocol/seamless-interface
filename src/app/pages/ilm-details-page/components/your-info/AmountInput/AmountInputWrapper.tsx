import React from "react";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated/generated";
import { AmountInput } from "./AmountInput";
import { useFetchAccountAssetBalance } from "../../../../../state/common/hooks/useFetchAccountAssetBalance";
import { Address } from "viem";

interface AmountInputBoxWrapperProps {
  assetAddress: Address;
  debouncedAmount: string;
  isDepositSuccessful: boolean;
  assetSymbol: string;
  assetLogo: any;
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  assetAddress,
  debouncedAmount,
  isDepositSuccessful,
  assetSymbol,
  assetLogo,
}) => {
  // TODO: properly invallidate query!!!
  const { balance: walletBalance } = useFetchAccountAssetBalance(
    assetAddress,
    isDepositSuccessful
  );
  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [assetAddress],
  });

  return (
    <AmountInput
      walletBalance={walletBalance || 0n}
      debouncedAmount={debouncedAmount}
      assetPrice={assetPrice}
      assetSymbol={assetSymbol}
      assetLogo={assetLogo}
    />
  );
};

export default AmountInputWrapper;
