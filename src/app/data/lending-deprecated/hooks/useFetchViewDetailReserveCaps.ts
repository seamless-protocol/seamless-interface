import { Address } from "viem";
import { Displayable, fUsdValueStructured, mergeQueryStates } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ViewDetailReserveCaps } from "../types/ViewDetailReserveCaps";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

interface DetailReserveCaps {
  supplyCap?: FetchBigInt;
  supplyCapUsd?: FetchBigInt;
  borrowCap?: FetchBigInt;
  borrowCapUsd?: FetchBigInt;
}

export const useFetchDetailReserveCaps = (asset: Address): FetchData<DetailReserveCaps> => {
  const {
    data: { supplyCap, borrowCap },
    ...capsRest
  } = useFetchReserveCaps(asset);

  const { data, ...priceRest } = useFetchAssetPrice({ asset });
  const price = data || 0n;

  const supplyCapUsd = cValueInUsd(supplyCap?.bigIntValue, price?.bigIntValue, supplyCap?.decimals);
  const borrowCapUsd = cValueInUsd(borrowCap?.bigIntValue, price?.bigIntValue, borrowCap?.decimals);

  return {
    ...mergeQueryStates([capsRest, priceRest]),
    data: {
      supplyCap,
      supplyCapUsd: fUsdValueStructured(supplyCapUsd),
      borrowCap,
      borrowCapUsd: fUsdValueStructured(borrowCapUsd),
    },
  };
};

export const useFetchViewDetailReserveCaps = (asset: Address): Displayable<ViewDetailReserveCaps> => {
  const {
    data: { supplyCap, supplyCapUsd, borrowCap, borrowCapUsd },
    ...rest
  } = useFetchDetailReserveCaps(asset);

  return {
    ...rest,
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
