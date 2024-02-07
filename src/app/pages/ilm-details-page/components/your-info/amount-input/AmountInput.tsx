// AmountInputBox.tsx
import React from "react";
import { etherUnits, formatUnits } from "viem";
import { RHFInputField } from "../../../../../../shared/components/form/rhf/RHFInputField";
import {
  formatBigIntOnTwoDecimals,
  formatToDisplayable,
} from "../../../../../../shared/utils/helpers";
import { DepositModalFormData } from "../DepositModal";

interface AmountInputBoxProps {
  walletBalance: bigint;
  debouncedAmountInUsd: number;
  assetSymbol: string;
  assetLogo: any;
}

// todo: generic amount input field
export const AmountInput: React.FC<AmountInputBoxProps> = ({
  walletBalance,
  debouncedAmountInUsd,
  assetSymbol,
  assetLogo,
}) => {
  return (
    <div className="border border-[#F2EEEE] rounded p-2">
      <div className="flex justify-between items-center">
        <RHFInputField<DepositModalFormData>
          name="amount"
          type="number"
          placeholder="0.00"
          className="pt-1 no-underline"
          max={formatUnits(walletBalance || 0n, etherUnits.wei)}
        />

        <div className="flex items-center space-x-2">
          <img src={assetLogo} alt="Logo" className="h-8" />
          <span className="text-lg text-right">{assetSymbol}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-sm">
          ${formatToDisplayable(debouncedAmountInUsd)}
        </span>
        <span className="text-xs">
          Wallet balance {formatBigIntOnTwoDecimals(walletBalance, 18)}
        </span>
      </div>
    </div>
  );
};
