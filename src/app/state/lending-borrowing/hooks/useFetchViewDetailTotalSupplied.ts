import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ONE_ETHER } from "../../../../meta";

interface TotalSupplied {
  totalSupplied: FetchBigInt;
  totalSuppliedUsd: FetchBigInt;
  capacity: FetchBigInt | undefined;
}

export const useFetchDetailTotalSupplied = (asset: Address): FetchData<TotalSupplied> => {
  const {
    isLoading: isReserveCapsLoading,
    isFetched: isReserveCapsFetched,
    data: reserveCaps,
  } = useFetchReserveCaps(asset);

  const {
    isLoading: isReserveDataLoading,
    isFetched: isReserveDataFetched,
    data: { totalSupplied },
  } = useFetchReserveData(asset);

  const { isLoading: isPriceLoading, isFetched: isPriceFetched, data: price } = useFetchAssetPrice({ asset });

  let capacity;
  if (reserveCaps && totalSupplied) {
    if (reserveCaps.supplyCap.bigIntValue === 0n) {
      capacity = 0n;
    } else {
      capacity =
        (totalSupplied.bigIntValue * ONE_ETHER * 100n) /
        (reserveCaps.supplyCap.bigIntValue * BigInt(10 ** totalSupplied.decimals));
    }
  }

  return {
    isLoading: isReserveDataLoading || isPriceLoading || isReserveCapsLoading,
    isFetched: isReserveDataFetched && isPriceFetched && isReserveCapsFetched,
    data: {
      totalSupplied: {
        ...totalSupplied,
      },
      totalSuppliedUsd: {
        bigIntValue: (totalSupplied.bigIntValue * price.bigIntValue) / BigInt(10 ** totalSupplied.decimals),
        symbol: "$",
        decimals: 8,
      },
      capacity: capacity
        ? {
            bigIntValue: capacity,
            symbol: "%",
            decimals: 18,
          }
        : undefined,
    },
  };
};

export const useFetchViewDetailTotalSupplied = (asset: Address): Displayable<ViewDetailTotalSupplied> => {
  const {
    isLoading,
    isFetched,
    data: { totalSupplied, totalSuppliedUsd, capacity },
  } = useFetchDetailTotalSupplied(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalSupplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupplied),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSuppliedUsd),
      },
      capacity: capacity
        ? formatFetchBigIntToViewBigInt(capacity, {
            singleDigitNumberDecimals: 1,
            doubleDigitNumberDecimals: 1,
            threeDigitNumberDecimals: 0,
          })
        : undefined,
    },
  };
};
