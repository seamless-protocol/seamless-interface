import { Address } from "viem";
import { Displayable, ViewBigInt, fFetchBigIntStructured } from "@shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { ONE_ETHER } from "@meta";

const cUtilizationRate = (totalSuppliedValue?: bigint, totalBorrowedValue?: bigint): bigint | undefined => {
  if (totalSuppliedValue == null || totalBorrowedValue == null) return undefined;

  const divider = totalSuppliedValue;
  if (divider === 0n) return undefined;

  return (totalBorrowedValue * ONE_ETHER * 100n) / divider;
};

interface AssetUtilizationRate {
  utilizationRate: FetchBigInt | undefined;
  noTotalSupplied?: boolean;
}

export const useFetchAssetUtilizationRate = (asset: Address): FetchData<AssetUtilizationRate> => {
  const {
    data: { totalSupplied, totalBorrowed },
    ...rest
  } = useFetchReserveData(asset);

  const utilizationRate = cUtilizationRate(totalSupplied?.bigIntValue, totalBorrowed?.bigIntValue);

  return {
    ...rest,
    data: {
      utilizationRate: fFetchBigIntStructured(utilizationRate, 18, "%"),
      noTotalSupplied: totalSupplied?.bigIntValue === 0n,
    },
  };
};

interface ViewAssetUtilizationRate {
  utilizationRate: ViewBigInt | undefined;
  noTotalSupplied?: boolean;
}

export const useFetchViewAssetUtilizationRate = (asset: Address): Displayable<ViewAssetUtilizationRate> => {
  const {
    data: { utilizationRate, noTotalSupplied },
    ...rest
  } = useFetchAssetUtilizationRate(asset);

  return {
    ...rest,
    data: {
      utilizationRate: formatFetchBigIntToViewBigInt(utilizationRate),
      noTotalSupplied,
    },
  };
};
