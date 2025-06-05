import { useMemo } from "react";

export type LimitStatus = "highUtilization" | "highBorrowRate" | "depositLimitExceeded";

const MAX_DEPOSIT_WE_TH = 26;
const BORROW_RATE_WARNING_AMOUNT = 20;
const UTILIZATION_WARNING_AMOUNT = 10;

interface UseFormStatusArgs {
  debouncedDepositAmount: string;
  debouncedWithdrawAmount: string;
}

export function useLeverageTokenLimitStatuses({
  debouncedDepositAmount,
  debouncedWithdrawAmount,
}: UseFormStatusArgs): LimitStatus[] {
  return useMemo(() => {
    const depositNum = parseFloat(debouncedDepositAmount) || 0;
    const statuses: LimitStatus[] = [];

    if (depositNum > UTILIZATION_WARNING_AMOUNT) {
      statuses.push("highUtilization");
    }

    if (depositNum > BORROW_RATE_WARNING_AMOUNT) {
      statuses.push("highBorrowRate");
    }

    if (depositNum > MAX_DEPOSIT_WE_TH) {
      statuses.push("depositLimitExceeded");
    }

    return statuses;
  }, [debouncedDepositAmount, debouncedWithdrawAmount]);
}
