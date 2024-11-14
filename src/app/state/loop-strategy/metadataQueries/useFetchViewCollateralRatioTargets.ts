import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { Displayable, fUsdValueStructured } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewCollateralRatioTargets } from "../types/ViewCollateralRatioTargets";
import { metadataQueryConfig } from "../../settings/queryConfig";
import { useReadContract } from "wagmi";

export interface CollateralRatioTargets {
  target: FetchBigInt | undefined;
}

export const useFetchCollateralRatioTargets = (strategy: Address): FetchData<CollateralRatioTargets> => {
  const result = useReadContract({
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
