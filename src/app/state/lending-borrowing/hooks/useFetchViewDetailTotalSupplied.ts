import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { getFetchBigIntStructured, mergeQueryStates } from "@shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ONE_ETHER } from "../../../../meta";

const cCapacity = (
  totalSuppliedValue?: bigint,
  supplyCapValue?: bigint,
  totalSuppliedDecimals?: number
): bigint | undefined => {
  if (totalSuppliedValue == null || supplyCapValue == null || totalSuppliedDecimals == null) return undefined;

  const divider = supplyCapValue * (10n ** BigInt(totalSuppliedDecimals));
  if (divider === 0n) return undefined

  return totalSuppliedValue * ONE_ETHER * 100n / divider
}

const cTotalSuppliedUsd = (
  totalSuppliedValue?: bigint,
  priceValue?: bigint,
  totalSuppliedDecimals?: number
): bigint | undefined => {
  if (totalSuppliedValue == null || priceValue == null || totalSuppliedDecimals == null) return undefined;

  const divider = (10n ** BigInt(totalSuppliedDecimals));
  if (divider === 0n) return undefined

  return (totalSuppliedValue * priceValue) / divider
}

interface TotalSupplied {
  totalSupplied: FetchBigInt | undefined;
  totalSuppliedUsd: FetchBigInt | undefined;
  capacity: FetchBigInt | undefined;
  hasSupplyCap?: boolean;
}
export const useFetchDetailTotalSupplied = (asset?: Address): FetchData<TotalSupplied> => {
  const { data: reserveCaps, ...rcRest } = useFetchReserveCaps(asset);
  const { data: { totalSupplied }, ...rdRest } = useFetchReserveData(asset);
  const { data: price, ...paRest } = useFetchAssetPrice({ asset });

  const capacity = cCapacity(totalSupplied?.bigIntValue,
    reserveCaps?.supplyCap.bigIntValue,
    totalSupplied?.decimals
  )

  const totalSuppliedUsd = cTotalSuppliedUsd(totalSupplied?.bigIntValue,
    price?.bigIntValue,
    totalSupplied?.decimals
  )

  return {
    ...mergeQueryStates([rcRest, rdRest, paRest]),
    data: {
      totalSupplied,
      totalSuppliedUsd: getFetchBigIntStructured(totalSuppliedUsd, 8, "$"),
      capacity: getFetchBigIntStructured(capacity, 18, "%"),
      hasSupplyCap: reserveCaps?.supplyCap.bigIntValue === 0n
    },
  };
};

export const useFetchViewDetailTotalSupplied = (asset?: Address): FetchData<ViewDetailTotalSupplied> => {
  const {
    data: { totalSupplied, totalSuppliedUsd, capacity, hasSupplyCap },
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
      }),
      hasSupplyCap
    },
  };
};
