import { Address } from "viem";
import { useFetchViewStrategyRemainingCap } from "../../loop-strategy/queries/useFetchStrategyRemainingCap";
import { useFetchViewDetailTotalSupplied } from "../../lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { Displayable, ViewBigInt } from "@shared";
import { findILMStrategyByAddress } from "../../loop-strategy/config/StrategyConfig";

export interface ViewRemainingCap {
  remainingCapPercentage?: ViewBigInt;
}

export const useFetchViewRemainingCap = (asset?: Address, isStrategy?: boolean): Displayable<ViewRemainingCap> => {
  const strategy = isStrategy ? findILMStrategyByAddress(asset) : undefined;
  const strategyResult = useFetchViewStrategyRemainingCap(isStrategy ? strategy?.address : undefined);
  const lendingResult = useFetchViewDetailTotalSupplied(!isStrategy ? asset : undefined);

  const result = isStrategy ? strategyResult : lendingResult;

  return {
    ...result,
    data: {
      remainingCapPercentage: isStrategy
        ? strategyResult.data?.remainingCapPercentage
        : lendingResult.data?.capacityRemainingPercentage,
    },
  };
};
