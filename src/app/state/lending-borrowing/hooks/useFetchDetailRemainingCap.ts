import { Address } from "viem";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useMemo } from "react";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { useFetchDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../shared";

interface RemainingCap {
  remainingCap: FetchBigInt | undefined;
  remainingCapUsd: FetchBigInt | undefined;
}

export const useFetchDetailRemainingCap = (asset?: Address): FetchData<RemainingCap> => {
  const { isLoading: isLoadingCaps, isFetched: isFetchedCaps, data: supplyCap } = useFetchReserveCaps(asset);
  const {
    isLoading: isLoadingSupplied,
    isFetched: isFetchedSupplied,
    data: totalSupplied,
  } = useFetchDetailTotalSupplied(asset);
  const { isLoading: isLoadingPrice, isFetched: isFetchedPrice, data: price } = useFetchAssetPrice({ asset });

  const remainingCapData = useMemo(() => {
    if (!supplyCap?.supplyCap.bigIntValue || !totalSupplied?.totalSupplied.bigIntValue || !price?.bigIntValue) {
      return {
        remainingCap: undefined,
        remainingCapUsd: undefined,
      };
    }

    const remaining = BigInt(totalSupplied?.totalSupplied.bigIntValue) - BigInt(supplyCap?.supplyCap.bigIntValue);
    const remainingUsd = (remaining * price.bigIntValue) / BigInt(10 ** price.decimals);

    return {
      remainingCap: {
        bigIntValue: remaining,
        decimals: supplyCap.supplyCap.decimals,
        symbol: supplyCap.supplyCap.symbol,
      },
      remainingCapUsd: {
        bigIntValue: remainingUsd,
        decimals: price.decimals,
        symbol: "$",
      },
    };
  }, [supplyCap.supplyCap.bigIntValue, totalSupplied.totalSupplied.bigIntValue, price]);

  return {
    data: remainingCapData,
    isLoading: isLoadingCaps || isLoadingSupplied || isLoadingPrice,
    isFetched: isFetchedCaps && isFetchedSupplied && isFetchedPrice,
  };
};

export interface ViewDetailRemainingCap {
  tokenAmount?: ViewBigInt;
  dollarAmount?: ViewBigInt;
}
export const useViewDetailRemainingCap = (asset?: Address): Displayable<ViewDetailRemainingCap> => {
  const {
    isLoading,
    isFetched,
    data: { remainingCap, remainingCapUsd },
  } = useFetchDetailRemainingCap(asset);

  return {
    isLoading,
    isFetched,
    data: {
      tokenAmount: remainingCap ? formatFetchBigIntToViewBigInt(remainingCap) : undefined,
      dollarAmount: remainingCapUsd ? formatFetchBigIntToViewBigInt(remainingCapUsd) : undefined,
    },
  };
};
