import { Address } from "viem";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt, useToken } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchDetailRemainingCap } from "./useFetchDetailRemainingCap";

export const useFetchMaxUserReserveDeposit = (reserve?: Address): FetchData<FetchBigInt | undefined> => {
  const { data: tokenData, isLoading: isTokenDataLoading, isFetched: isTokenDataFetched } = useToken(reserve);

  const {
    data: reserveBalance,
    isLoading: isReserveBalanceLoading,
    isFetched: isReserveDataFetched,
  } = useFetchAssetBalance(reserve);

  const {
    data: remainingCap,
    isLoading: isRemainingCapLoading,
    isFetched: isRemainingCapFetched,
  } = useFetchDetailRemainingCap(reserve);

  let maxUserReserveDeposit;
  if (remainingCap.remainingCap && reserveBalance) {
    const remaining = remainingCap.remainingCap.bigIntValue;
    const balance = reserveBalance.bigIntValue;
    maxUserReserveDeposit = remaining > balance ? balance : remaining;
  }

  return {
    isLoading: isTokenDataLoading || isReserveBalanceLoading || isRemainingCapLoading,
    isFetched: isTokenDataFetched || isReserveDataFetched || isRemainingCapFetched,
    data: maxUserReserveDeposit
      ? {
        bigIntValue: maxUserReserveDeposit,
        symbol: tokenData.symbol,
        decimals: tokenData.decimals,
      }
      : undefined,
  };
};

export const useFetchViewMaxUserReserveDeposit = (reserve?: Address): Displayable<ViewBigInt | undefined> => {
  const { data: maxUserReserveData, isLoading, isFetched } = useFetchMaxUserReserveDeposit(reserve);

  return {
    isLoading,
    isFetched,
    data: maxUserReserveData ? formatFetchBigIntToViewBigInt(maxUserReserveData) : undefined,
  };
};
