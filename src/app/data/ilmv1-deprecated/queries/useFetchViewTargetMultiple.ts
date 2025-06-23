import { Address } from "viem";
import { convertRatioToMultiple, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, ViewBigInt } from "../../../../shared";
import { useFetchCollateralRatioTargets } from "../metadata/useFetchViewCollateralRatioTargets";

export const useFetchTargetMultiple = (strategy: Address): FetchData<FetchBigInt | undefined> => {
  const {
    data: { target },
    ...rest
  } = useFetchCollateralRatioTargets(strategy);

  return {
    ...rest,
    data: {
      bigIntValue: convertRatioToMultiple(target?.bigIntValue),
      decimals: 8,
      symbol: "x",
    },
  };
};

export const useFetchViewTargetMultiple = (strategy: Address): Displayable<ViewBigInt> => {
  const { data: targetMultiple, ...rest } = useFetchTargetMultiple(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(targetMultiple),
  };
};
