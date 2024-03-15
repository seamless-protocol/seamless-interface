import { Address } from "viem";
import { useFetchViewDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { useFetchViewDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { Displayable, ViewBigInt } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { ONE_ETHER } from "../../../meta";

export const useFetchAssetUtilizationRate = (
  asset: Address
): FetchData<FetchBigInt> => {
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
    data: {
      bigIntValue: utilizationRate || 0n,
      decimals: 18,
      symbol: "%",
    },
  };
};

export const useFetchViewAssetUtilizationRate = (
  asset: Address
): Displayable<ViewBigInt> => {
  const {
    isLoading,
    isFetched,
    data: utilizationRate,
  } = useFetchAssetUtilizationRate(asset);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(utilizationRate),
  };
};
