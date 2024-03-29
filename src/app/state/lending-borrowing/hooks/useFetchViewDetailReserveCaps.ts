import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { ViewDetailReserveCaps } from "../types/ViewDetailReserveCaps";

interface DetailReserveCaps {
  supplyCap: FetchBigInt;
  supplyCapUsd: FetchBigInt;
  borrowCap: FetchBigInt;
  borrowCapUsd: FetchBigInt;
}

export const useFetchDetailReserveCaps = (asset: Address): FetchData<DetailReserveCaps> => {
  const {
    isLoading: isCapsLoading,
    isFetched: isCapsFetched,
    data: { supplyCap, borrowCap },
  } = useFetchReserveCaps(asset);

  const { isLoading: isPriceLoading, isFetched: isPriceFetched, data } = useFetchAssetPrice(asset);
  const price = data || 0n;

  return {
    isLoading: isCapsLoading || isPriceLoading,
    isFetched: isCapsFetched && isPriceFetched,
    data: {
      supplyCap,
      supplyCapUsd: {
        bigIntValue: (supplyCap.bigIntValue * price.bigIntValue) / BigInt(10 ** supplyCap.decimals),
        symbol: price.symbol,
        decimals: price.decimals,
      },
      borrowCap,
      borrowCapUsd: {
        bigIntValue: (borrowCap.bigIntValue * price.bigIntValue) / BigInt(10 ** borrowCap.decimals),
        symbol: price.symbol,
        decimals: price.decimals,
      },
    },
  };
};

export const useFetchViewDetailReserveCaps = (asset: Address): Displayable<ViewDetailReserveCaps> => {
  const {
    isLoading,
    isFetched,
    data: { supplyCap, supplyCapUsd, borrowCap, borrowCapUsd },
  } = useFetchDetailReserveCaps(asset);

  return {
    isLoading,
    isFetched,
    data: {
      supplyCap: {
        tokenAmount: formatFetchBigIntToViewBigInt(supplyCap),
        dollarAmount: formatFetchBigIntToViewBigInt(supplyCapUsd),
      },
      borrowCap: {
        tokenAmount: formatFetchBigIntToViewBigInt(borrowCap),
        dollarAmount: formatFetchBigIntToViewBigInt(borrowCapUsd),
      },
    },
  };
};
