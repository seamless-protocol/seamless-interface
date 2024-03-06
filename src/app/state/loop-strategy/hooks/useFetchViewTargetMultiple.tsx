import { Address } from "viem";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { ViewTargetMultiple } from "../types/ViewTargetMultiple";
import { useFetchCollateralRatioTargets } from "../metadataQueries/useFetchViewCollateralRatioTargets";

export interface TargetMultiple {
  targetMultiple: FetchBigInt;
}

export const useFetchTargetMultiple = (
  strategy: Address
): Fetch<TargetMultiple> => {
  const {
    isLoading,
    isFetched,
    data: { target },
  } = useFetchCollateralRatioTargets(strategy);

  return {
    isLoading,
    isFetched,
    targetMultiple: {
      bigIntValue: convertRatioToMultiple(target.bigIntValue),
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
