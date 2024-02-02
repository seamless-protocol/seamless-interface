import React from "react";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../../../generated/generated";
import { AmountInput } from "./AmountInput";
import { useFetchAccountAssetBalance } from "../../../../../state/common/hooks/useFetchAccountAssetBalance";

interface AmountInputBoxWrapperProps {
  debouncedAmount: string;
  isDepositSuccessful: boolean;
}

export const AmountInputWrapper: React.FC<AmountInputBoxWrapperProps> = ({
  debouncedAmount,
  isDepositSuccessful,
}) => {
  // TODO: properly invallidate query!!!
  const { balance: walletBalance } = useFetchAccountAssetBalance(
    cbEthAddress,
    isDepositSuccessful
  );
  const { data: cbEthPrice } = useReadAaveOracleGetAssetPrice({
    args: [cbEthAddress],
  });

  return (
    <AmountInput
      walletBalance={walletBalance || 0n}
      debouncedAmount={debouncedAmount}
      cbEthPrice={cbEthPrice}
    />
  );
};

export default AmountInputWrapper;
