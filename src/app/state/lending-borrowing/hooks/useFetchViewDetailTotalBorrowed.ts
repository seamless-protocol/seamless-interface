import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalBorrowed } from "../types/ViewDetailTotalBorrowed";
import { getBaseAssetConfig } from "../config/BaseAssetsConfig";

interface TotalBorrowed {
  totalBorrowed: FetchBigInt;
  totalBorrowedUsd: FetchBigInt;
}

export const useFetchDetailTotalBorrowed = (asset: Address): FetchData<TotalBorrowed> => {
  const {
    isLoading: isReserveDataLoading,
    isFetched: isReserveDataFetched,
    data: { totalBorrowed },
  } = useFetchReserveData(asset);

  const {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    data: price,
  } = useFetchAssetPrice({ asset, useCoinGeckoPrice: getBaseAssetConfig(asset)?.useCoinGeckoPrice });

  return {
    isLoading: isReserveDataLoading || isPriceLoading,
    isFetched: isReserveDataFetched && isPriceFetched,
    data: {
      totalBorrowed: {
        ...totalBorrowed,
      },
      totalBorrowedUsd: {
        bigIntValue: (totalBorrowed.bigIntValue * price.bigIntValue) / BigInt(10 ** totalBorrowed.decimals),
        symbol: "$",
        decimals: 8,
      },
    },
  };
};

export const useFetchViewDetailTotalBorrowed = (asset: Address): Displayable<ViewDetailTotalBorrowed> => {
  const {
    isLoading,
    isFetched,
    data: { totalBorrowed, totalBorrowedUsd },
  } = useFetchDetailTotalBorrowed(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalBorrowed: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalBorrowed),
        dollarAmount: formatFetchBigIntToViewBigInt(totalBorrowedUsd),
      },
    },
  };
};
