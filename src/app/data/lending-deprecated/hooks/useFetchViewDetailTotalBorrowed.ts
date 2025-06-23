import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, fUsdValueStructured, mergeQueryStates } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalBorrowed } from "../types/ViewDetailTotalBorrowed";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

interface TotalBorrowed {
  totalBorrowed?: FetchBigInt;
  totalBorrowedUsd?: FetchBigInt;
}

export const useFetchDetailTotalBorrowed = (asset: Address): FetchData<TotalBorrowed> => {
  const {
    data: { totalBorrowed },
    ...reserveRest
  } = useFetchReserveData(asset);
  const { data: price, ...priceRest } = useFetchAssetPrice({ asset });

  const totalBorrowedUsd = cValueInUsd(totalBorrowed?.bigIntValue, price.bigIntValue, totalBorrowed?.decimals);

  return {
    ...mergeQueryStates([priceRest, reserveRest]),
    data: {
      totalBorrowed,
      totalBorrowedUsd: fUsdValueStructured(totalBorrowedUsd),
    },
  };
};

export const useFetchViewDetailTotalBorrowed = (asset: Address): Displayable<ViewDetailTotalBorrowed> => {
  const {
    data: { totalBorrowed, totalBorrowedUsd },
    ...rest
  } = useFetchDetailTotalBorrowed(asset);

  return {
    ...rest,
    data: {
      totalBorrowed: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalBorrowed),
        dollarAmount: formatFetchBigIntToViewBigInt(totalBorrowedUsd),
      },
    },
  };
};
