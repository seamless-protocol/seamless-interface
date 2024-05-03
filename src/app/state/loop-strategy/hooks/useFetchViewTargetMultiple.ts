import { Address } from "viem";
import { convertRatioToMultiple, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, ViewBigInt } from "../../../../shared";
import { useFetchCollateralRatioTargets } from "../metadataQueries/useFetchViewCollateralRatioTargets";

export const useFetchTargetMultiple = (strategy: Address): FetchData<FetchBigInt> => {
  const {
    isLoading,
    isFetched,
    data: { target },
  } = useFetchCollateralRatioTargets(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      bigIntValue: convertRatioToMultiple(target.bigIntValue),
      decimals: 8,
      symbol: "x",
    },
  };
};

export const useFetchViewTargetMultiple = (strategy: Address): Displayable<ViewBigInt> => {
  const { isLoading, isFetched, data: targetMultiple } = useFetchTargetMultiple(strategy);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(targetMultiple),
  };
};
