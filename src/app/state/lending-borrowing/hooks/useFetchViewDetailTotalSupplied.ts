import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { getBaseAssetConfig } from "../config/BaseAssetsConfig";

interface TotalSupplied {
  totalSupplied: FetchBigInt;
  totalSuppliedUsd: FetchBigInt;
}

export const useFetchDetailTotalSupplied = (asset: Address): FetchData<TotalSupplied> => {
  const {
    isLoading: isReserveDataLoading,
    isFetched: isReserveDataFetched,
    data: { totalSupplied },
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
      totalSupplied: {
        ...totalSupplied,
      },
      totalSuppliedUsd: {
        bigIntValue: (totalSupplied.bigIntValue * price.bigIntValue) / BigInt(10 ** totalSupplied.decimals),
        symbol: "$",
        decimals: 8,
      },
    },
  };
};

export const useFetchViewDetailTotalSupplied = (asset: Address): Displayable<ViewDetailTotalSupplied> => {
  const {
    isLoading,
    isFetched,
    data: { totalSupplied, totalSuppliedUsd },
  } = useFetchDetailTotalSupplied(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalSupplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupplied),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSuppliedUsd),
      },
    },
  };
};
