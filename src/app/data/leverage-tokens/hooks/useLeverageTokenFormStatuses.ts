import { useMemo } from "react";
import { LeverageToken } from "../queries/all-leverage-tokens/leverageTokens";
import { useFetchBorrowApy } from "../queries/borrow-apy/borrow-apy.fetch";
import { useFetchUtilization } from "../queries/utilization/utilization.fetch";
import { Displayable, mergeQueryStates } from "../../../../shared";

export type LimitStatus = "highUtilization" | "highBorrowRate" | "depositLimitExceeded";

interface UseFormStatusArgs {
  debouncedDepositAmount: string;
  selectedLeverageToken?: LeverageToken;
}

export function useLeverageTokenLimitStatuses({
  debouncedDepositAmount,
  selectedLeverageToken,
}: UseFormStatusArgs): Displayable<LimitStatus[]> {
  const { data: borrowApy, ...borrowApyRest } = useFetchBorrowApy(selectedLeverageToken?.address);
  const { data: utilization, ...utilizationRest } = useFetchUtilization(selectedLeverageToken?.address);

  return useMemo(() => {
    const statuses: LimitStatus[] = [];

    if (
      utilization?.currentUtilization &&
      utilization?.optimalUtilization &&
      utilization.currentUtilization > utilization.optimalUtilization
    ) {
      statuses.push("highUtilization");
    }

    if (
      selectedLeverageToken?.limitsConfig.maxBorrowApy != null &&
      (borrowApy || 0) > selectedLeverageToken?.limitsConfig.maxBorrowApy
    ) {
      statuses.push("highBorrowRate");
    }

    if (
      selectedLeverageToken?.tvl != null &&
      selectedLeverageToken?.limitsConfig.maxDeposit &&
      (Number(selectedLeverageToken.tvl?.tokenAmount.value) || 0) + Number(debouncedDepositAmount || 0) >
        selectedLeverageToken?.limitsConfig.maxDeposit
    ) {
      statuses.push("depositLimitExceeded");
    }

    return {
      ...mergeQueryStates([borrowApyRest, utilizationRest]),
      data: statuses,
    };
  }, [
    debouncedDepositAmount,
    selectedLeverageToken,
    borrowApy,
    selectedLeverageToken?.tvl?.tokenAmount.value,
    utilization?.currentUtilization,
    utilization?.optimalUtilization,
    borrowApyRest,
    utilizationRest,
  ]);
}
