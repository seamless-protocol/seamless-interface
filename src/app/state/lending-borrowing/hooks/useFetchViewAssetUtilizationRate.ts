import { Address } from "viem";
import { useFetchViewDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { useFetchViewDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { Displayable } from "../../../../shared";
import { ViewAssetUtilizationRate } from "../types/ViewAssetUtilizationRate";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { ONE_ETHER } from "../../../meta";

interface AssetUtilizationRate {
  utilizationRate: FetchBigInt;
}

export const useFetchAssetUtilizationRate = (
  asset: Address
): Fetch<AssetUtilizationRate> => {
  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data: { totalSupplied },
  } = useFetchViewDetailTotalSupplied(asset);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: { totalBorrowed },
  } = useFetchViewDetailTotalBorrowed(asset);

  let utilizationRate;
  if (
    totalSupplied.tokenAmount.bigIntValue &&
    totalBorrowed.tokenAmount.bigIntValue
  ) {
    utilizationRate =
      (totalBorrowed.tokenAmount.bigIntValue * ONE_ETHER * 100n) /
      totalSupplied.tokenAmount.bigIntValue;
  }

  return {
    isLoading: isTotalSuppliedLoading || isTotalBorrowedLoading,
    isFetched: isTotalSuppliedFetched && isTotalBorrowedFetched,
    utilizationRate: {
      bigIntValue: utilizationRate || 0n,
      decimals: 18,
      symbol: "%",
    },
  };
};

export const useFetchViewAssetUtilizationRate = (
  asset: Address
): Displayable<ViewAssetUtilizationRate> => {
  const { isLoading, isFetched, utilizationRate } =
    useFetchAssetUtilizationRate(asset);

  return {
    isLoading,
    isFetched,
    data: {
      utilizationRate: formatFetchBigIntToViewBigInt(utilizationRate),
    },
  };
};
