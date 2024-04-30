import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { RQResponse, useSeamlessContractRead } from "../../../../shared";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewCollateralRatioTargets } from "../types/ViewCollateralRatioTargets";
import { metadataQueryConfig } from "../../settings/config";

export interface CollateralRatioTargets {
  data: {
    target: FetchBigInt;
  };
}

export const useFetchCollateralRatioTargets = (strategy: Address): Fetch<CollateralRatioTargets> => {
  const result = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
    query: metadataQueryConfig,
  });

  return {
    ...result,
    data: {
      target: {
        bigIntValue: result.data?.target || 0n,
        decimals: 8,
        symbol: "",
      },
    },
  };
};

export const useFetchViewCollateralRatioTargets = (strategy: Address): RQResponse<ViewCollateralRatioTargets> => {
  const {
    isLoading,
    isFetched,
    data: { target },
  } = useFetchCollateralRatioTargets(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      target: formatFetchBigIntToViewBigInt(target),
    },
  };
};
