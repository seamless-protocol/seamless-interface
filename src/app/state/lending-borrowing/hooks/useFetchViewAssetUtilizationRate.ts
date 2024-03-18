import { Address } from "viem";
import { Displayable, ViewBigInt } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { ONE_ETHER } from "../../../meta";
import { useFetchReserveData } from "../queries/useFetchReserveData";

export const useFetchAssetUtilizationRate = (
  asset: Address
): FetchData<FetchBigInt> => {
  const {
    isLoading,
    isFetched,
    data: { totalSupplied, totalBorrowed },
  } = useFetchReserveData(asset);

  let utilizationRate;
  if (totalSupplied.bigIntValue && totalBorrowed.bigIntValue) {
    utilizationRate =
      (totalBorrowed.bigIntValue * ONE_ETHER * 100n) /
      totalSupplied.bigIntValue;
  }

  return {
    isLoading,
    isFetched,
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
