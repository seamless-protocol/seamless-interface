import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { Displayable, fUsdValueStructured, useSeamlessContractRead } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewCollateralRatioTargets } from "../types/ViewCollateralRatioTargets";
import { metadataQueryConfig } from "../../settings/config";

export interface CollateralRatioTargets {
  target: FetchBigInt | undefined;
}

export const useFetchCollateralRatioTargets = (strategy: Address): FetchData<CollateralRatioTargets> => {
  const result = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
    query: metadataQueryConfig,
  });

  return {
    ...result,
    data: {
      target: fUsdValueStructured(result.data?.target, 8, ""),
    },
  };
};

export const useFetchViewCollateralRatioTargets = (strategy: Address): Displayable<ViewCollateralRatioTargets> => {
  const {
    data: { target },
    ...rest
  } = useFetchCollateralRatioTargets(strategy);

  return {
    ...rest,
    data: {
      target: formatFetchBigIntToViewBigInt(target),
    },
  };
};
