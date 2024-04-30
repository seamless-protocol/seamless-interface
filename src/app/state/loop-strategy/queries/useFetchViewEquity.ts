import { Address } from "viem";
import { RQResponse, formatFetchBigIntToViewBigIntTemp, useSeamlessContractRead, useToken } from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { loopStrategyAbi } from "../../../generated";
import { ViewDetailEquity } from "../types/ViewDetailEquity";

interface StrategyEquity {
  equity: FetchBigInt | undefined;
  equityUsd: FetchBigInt | undefined;
}

export const useFetchDetailEquity = (strategy: Address): FetchData<StrategyEquity> => {
  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const {
    data: { symbol, decimals },
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
  } = useToken(underlyingAsset);

  const {
    data: equity,
    isLoading: isEquityLoading,
    isFetched: isEquityFetched,
  } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equity",
  });

  const {
    data: equityUsd,
    isLoading: isEquityUsdLoading,
    isFetched: isEquityUsdFetched,
  } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
  });

  const retEquity = equity ? { bigIntValue: equity, decimals, symbol } : undefined;
  const retEquityUsd = equityUsd ? { bigIntValue: equityUsd, decimals: 8, symbol: "$" } : undefined;

  return {
    isLoading: isEquityLoading || isEquityUsdLoading || isUnderlyingAssetLoading || isTokenDataLoading,
    isFetched: isEquityFetched && isEquityUsdFetched && isUnderlyingAssetFetched && isTokenDataFetched,
    data: {
      equity: retEquity,
      equityUsd: retEquityUsd,
    },
  };
};

export const useFetchViewDetailEquity = (strategy: Address): RQResponse<ViewDetailEquity> => {
  const {
    isLoading,
    isFetched,
    data: { equity, equityUsd },
  } = useFetchDetailEquity(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      tokenAmount: formatFetchBigIntToViewBigIntTemp(equity),
      dollarAmount: formatFetchBigIntToViewBigIntTemp(equityUsd),
    },
  };
};
