import { Address } from "viem";
import { useFetchDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { useFetchDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, formatFetchBigIntToViewBigInt } from "@shared";
import { ViewDetailReserveTvl } from "../types/ViewDetailReserveTvl";

interface DetailReserveTvl {
  tvl: FetchBigInt;
  tvlUsd: FetchBigInt;
}

export const useFetchDetailReserveTvl = (reserve: Address): FetchData<DetailReserveTvl> => {
  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data,
  } = useFetchDetailTotalSupplied(reserve);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: totalBorrowed,
  } = useFetchDetailTotalBorrowed(reserve);

  return {
    isLoading: isTotalSuppliedLoading || isTotalBorrowedLoading,
    isFetched: isTotalSuppliedFetched && isTotalBorrowedFetched,
    data: {
      tvl: {
        bigIntValue: data.totalSupplied.bigIntValue - totalBorrowed.totalBorrowed.bigIntValue,
        decimals: data.totalSupplied.decimals,
        symbol: data.totalSupplied.symbol,
      },
      tvlUsd: {
        bigIntValue: data.totalSuppliedUsd.bigIntValue - totalBorrowed.totalBorrowedUsd.bigIntValue,
        decimals: data.totalSuppliedUsd.decimals,
        symbol: data.totalSuppliedUsd.symbol,
      },
    },
  };
};

export const useFetchViewDetailReserveTvl = (reserve: Address): Displayable<ViewDetailReserveTvl> => {
  const {
    isLoading,
    isFetched,
    data: { tvl, tvlUsd },
  } = useFetchDetailReserveTvl(reserve);

  return {
    isLoading,
    isFetched,
    data: {
      tvl: {
        tokenAmount: formatFetchBigIntToViewBigInt(tvl),
        dollarAmount: formatFetchBigIntToViewBigInt(tvlUsd),
      },
    },
  };
};
