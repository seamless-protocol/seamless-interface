import { Address } from "viem";
import {
  Displayable,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigIntTemp,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
} from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { loopStrategyAbi } from "../../../generated";
import { ViewDetailEquity } from "../types/ViewDetailEquity";
import { useReadContract } from "wagmi";

interface StrategyEquity {
  equity: FetchBigInt | undefined;
  equityUsd: FetchBigInt | undefined;
}

export const useFetchDetailEquity = (strategy?: Address): FetchData<StrategyEquity> => {
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);
  const { data: tokenData, ...tokenDataRest } = useToken(underlyingAsset);

  const { data: equity, ...equityRest } = useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equity",
    query: {
      enabled: !!strategy,
    },
  });

  const { data: equityUsd, ...equityUsdRest } = useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
    query: {
      enabled: !!strategy,
    },
  });

  return {
    ...mergeQueryStates([underlyingAssetRest, tokenDataRest, equityRest, equityUsdRest]),
    data: {
      equity: fFetchBigIntStructured(equity, tokenData.decimals, tokenData.symbol),
      equityUsd: fUsdValueStructured(equityUsd),
    },
  };
};

export const useFetchViewDetailEquity = (strategy?: Address): Displayable<ViewDetailEquity> => {
  const {
    data: { equity, equityUsd },
    ...rest
  } = useFetchDetailEquity(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(equity),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(equityUsd),
    },
  };
};
