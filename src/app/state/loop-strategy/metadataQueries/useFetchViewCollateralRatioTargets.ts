import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewCollateralRatioTargets } from "../types/ViewCollateralRatioTargets";

export interface CollateralRatioTargets {
  target: FetchBigInt;
}

export const useFetchCollateralRatioTargets = (
  strategy: Address
): Fetch<CollateralRatioTargets> => {
  const {
    data: collateralRatioTargets,
    isLoading,
    isFetched,
  } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
  });

  return {
    isLoading,
    isFetched,
    target: {
      bigIntValue: collateralRatioTargets?.target || 0n,
      decimals: 8,
      symbol: "",
    },
  };
};

export const useFetchViewCollateralRatioTargets = (
  strategy: Address
): Displayable<ViewCollateralRatioTargets> => {
  const { isLoading, isFetched, target } =
    useFetchCollateralRatioTargets(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      target: formatFetchBigIntToViewBigInt(target),
    },
  };
};
