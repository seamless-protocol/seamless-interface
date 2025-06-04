import { useMemo } from "react";

export type LimitStatus = "normal" | "highUtilization" | "highBorrowRate" | "depositLimitExceeded";

const MAX_DEPOSIT_WE_TH = 26;

const BORROW_RATE_WARNING_AMOUNT = 20;

const UTILIZATION_WARNING_AMOUNT = 10;

interface UseFormStatusArgs {
  debouncedDepositAmount: string;
  debouncedWithdrawAmount: string;
}

export function useLeverageTokenLimitStatus({
  debouncedDepositAmount,
  debouncedWithdrawAmount, // (unused here)
}: UseFormStatusArgs): LimitStatus {
  return useMemo(() => {
    const depositNum = parseFloat(debouncedDepositAmount) || 0;

    if (depositNum > MAX_DEPOSIT_WE_TH) {
      return "depositLimitExceeded";
    }

    if (depositNum > BORROW_RATE_WARNING_AMOUNT) {
      return "highBorrowRate";
    }

    if (depositNum > UTILIZATION_WARNING_AMOUNT) {
      return "highUtilization";
    }

    return "normal";
  }, [debouncedDepositAmount, debouncedWithdrawAmount]);
}
