import { useMemo } from "react";
import { ViewBigInt, formatFetchBigIntToViewBigInt } from "@shared";
import { USD_VALUE_DECIMALS } from "@meta";
import { Reward } from "../contexts/RewardsProvider";

/**
 * Hook: sum up all `dollarAmount` fields from an array of `Reward`.
 * The result is memoized so it only recalculates if any reward’s `dollarAmount.bigIntValue` changes.
 */
export function useSumRewardDollarAmounts(rewards: Reward[]): ViewBigInt {
  return useMemo(() => {
    const totalRaw: bigint = rewards.reduce((acc, r) => {
      return acc + (r.dollarAmount?.bigIntValue ?? 0n);
    }, 0n);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: totalRaw,
      decimals: USD_VALUE_DECIMALS,
      symbol: "$",
    });
  }, [rewards]);
}
