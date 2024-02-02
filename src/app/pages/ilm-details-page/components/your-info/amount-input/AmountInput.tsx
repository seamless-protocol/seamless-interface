// AmountInputBox.tsx
import React from "react";
import { etherUnits, formatUnits, parseUnits } from "viem";
import { RHFInputField } from "../../../../../../shared/components/form/rhf/RHFInputField";
import { formatBigIntOnTwoDecimals } from "../../../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../../../meta/constants";
import { DepositModalFormData } from "../DepositModal";

import cbethImg from "/public/cbeth.svg";

interface AmountInputBoxProps {
  walletBalance: bigint;
  debouncedAmount: string;
  cbEthPrice?: bigint;
}

// todo: generic amount input field
export const AmountInput: React.FC<AmountInputBoxProps> = ({
  walletBalance,
  debouncedAmount,
  cbEthPrice,
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
          <img src={cbethImg} alt="Logo" className="h-8" />
          <span className="text-lg text-right">cbETH</span>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-sm">
          $
          {formatBigIntOnTwoDecimals(
            (parseUnits(debouncedAmount, 18) * (cbEthPrice || 0n)) / ONE_ETHER,
            8
          )}
        </span>
        <span className="text-xs">
          Wallet balance {formatBigIntOnTwoDecimals(walletBalance, 18)}
        </span>
      </div>
    </div>
  );
};
