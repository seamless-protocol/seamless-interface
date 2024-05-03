import { Address } from "viem";
import { useFetchDetailEquity } from "../queries/useFetchViewEquity";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { DecimalsOptions, Displayable, formatFetchBigIntToViewBigInt, useToken } from "@shared";
import { useFetchViewAssetTotalSupply } from "../../common/queries/useFetchViewAssetTotalSupply";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { ViewDetailUserEquity } from "../types/ViewDetailUserEquity";

interface DetailUserEquity {
  userEquity: FetchBigInt | undefined;
  userEquityUsd: FetchBigInt | undefined;
}

export const useFetchDetailUserEquity = (strategy: Address): FetchData<DetailUserEquity> => {
  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const { data: tokenData, isLoading: isTokenDataLoading, isFetched: isTokenDataFetched } = useToken(underlyingAsset);

  const {
    data: { equity, equityUsd },
    isLoading: isDetailEquityLoading,
    isFetched: isDetailEquityFetched,
  } = useFetchDetailEquity(strategy);

  const {
    data: strategyBalance,
    isLoading: isStrategyLoading,
    isFetched: isStrategyFetched,
  } = useFetchAssetBalance(strategy);

  const {
    data: strategyTotalSupply,
    isLoading: isStrategyTotalSupplyLoading,
    isFetched: isStrategyTotalSupplyFetched,
  } = useFetchViewAssetTotalSupply(strategy);

  let userEquity;
  let userEquityUsd;
  if (
    underlyingAsset &&
    tokenData &&
    equity?.bigIntValue &&
    equityUsd?.bigIntValue &&
    strategyBalance.bigIntValue &&
    strategyTotalSupply?.bigIntValue
  ) {
    userEquity = (equity.bigIntValue * strategyBalance.bigIntValue) / strategyTotalSupply.bigIntValue;
    userEquityUsd = (equityUsd.bigIntValue * strategyBalance.bigIntValue) / strategyTotalSupply.bigIntValue;
  }

  const equityRet = userEquity
    ? { bigIntValue: userEquity, decimals: tokenData.decimals, symbol: tokenData.symbol }
    : undefined;
  const equityUsdRet = userEquityUsd ? { bigIntValue: userEquityUsd, decimals: 8, symbol: "$" } : undefined;

  return {
    isLoading:
      isUnderlyingAssetLoading ||
      isTokenDataLoading ||
      isDetailEquityLoading ||
      isStrategyLoading ||
      isStrategyTotalSupplyLoading,
    isFetched:
      isUnderlyingAssetFetched &&
      isTokenDataFetched &&
      isDetailEquityFetched &&
      isStrategyFetched &&
      isStrategyTotalSupplyFetched,
    data: {
      userEquity: equityRet,
      userEquityUsd: equityUsdRet,
    },
  };
};

export const useFetchViewDetailUserEquity = (
  strategy: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewDetailUserEquity> => {
  const {
    isLoading,
    isFetched,
    data: { userEquity, userEquityUsd },
  } = useFetchDetailUserEquity(strategy);

  return {
    isLoading,
    isFetched,
    data: {
      tokenAmount: userEquity ? formatFetchBigIntToViewBigInt(userEquity, decimalsOptions) : undefined,
      dollarAmount: userEquityUsd ? formatFetchBigIntToViewBigInt(userEquityUsd, decimalsOptions) : undefined,
    },
  };
};
