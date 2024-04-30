import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { divideBigInts, expBigInt, getFetchBigIntStructured, mergeQueryStates, multiplyBigInts } from "../../../../shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ONE_ETHER } from "../../../../meta";

interface TotalSupplied {
  totalSupplied: FetchBigInt | undefined;
  totalSuppliedUsd: FetchBigInt | undefined;
  capacity: FetchBigInt | undefined;
}

// to review
export const useFetchDetailTotalSupplied = (asset?: Address): FetchData<TotalSupplied> => {
  const { data: reserveCaps, ...rcRest } = useFetchReserveCaps(asset);
  const { data: { totalSupplied }, ...rdRest } = useFetchReserveData(asset);
  const { data: price, ...paRest } = useFetchAssetPrice({ asset });

  const capacity = divideBigInts(
    multiplyBigInts([
      totalSupplied?.bigIntValue, ONE_ETHER, BigInt(100)
    ]),
    multiplyBigInts([
      reserveCaps.supplyCap.bigIntValue,
      expBigInt(10n, totalSupplied?.decimals)
    ])
  );
  const totalSuppliedUsdBigInt = divideBigInts(
    multiplyBigInts([
      totalSupplied?.bigIntValue,
      price.bigIntValue
    ]),
    expBigInt(10n, totalSupplied?.decimals)
  )

  return {
    ...mergeQueryStates([rcRest, rdRest, paRest]),
    data: {
      totalSupplied,
      totalSuppliedUsd: getFetchBigIntStructured(totalSuppliedUsdBigInt, 8, "$"),
      capacity: getFetchBigIntStructured(capacity, 18, "%")
    },
  };
};

export const useFetchViewDetailTotalSupplied = (asset?: Address): FetchData<ViewDetailTotalSupplied> => {
  const {
    data: { totalSupplied, totalSuppliedUsd, capacity },
    ...rest
  } = useFetchDetailTotalSupplied(asset);

  return {
    ...rest,
    data: {
      totalSupplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupplied),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSuppliedUsd),
      },
      capacity: formatFetchBigIntToViewBigInt(capacity, {
        singleDigitNumberDecimals: 1,
        doubleDigitNumberDecimals: 1,
        threeDigitNumberDecimals: 0,
      })
    },
  };
};
