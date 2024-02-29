import { Address } from "viem";
import { useReadContract } from "wagmi";
import { loopStrategyAbi } from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { ViewTargetMultiple } from "../types/ViewTargetMultiple";

export interface TargetMultiple {
  targetMultiple: FetchBigInt;
}

export const useFetchTargetMultiple = (
  strategy: Address
): Fetch<TargetMultiple> => {
  const {
    data: collateralRatioTargets,
    isLoading,
    isFetched,
  } = useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
  });

  let targetMultiple = collateralRatioTargets
    ? convertRatioToMultiple(collateralRatioTargets.target)
    : 0n;

  return {
    isLoading,
    isFetched,
    targetMultiple: {
      bigIntValue: targetMultiple,
      decimals: 8,
      symbol: "x",
    },
  };
};

export const useFetchViewTargetMultiple = (
  strategy: Address
): Displayable<ViewTargetMultiple> => {
  const { isLoading, isFetched, targetMultiple } =
    useFetchTargetMultiple(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      targetMultiple: formatFetchBigIntToViewBigInt(targetMultiple),
    },
  };
};
