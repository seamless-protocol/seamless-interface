import { Address } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { useFetchDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import {
  mergeQueryStates,
  Displayable,
  formatFetchBigIntToViewBigInt,
  ViewBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
} from "../../../../shared";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

const cRemainingCap = (totalSuppliedValue?: bigint, supplyCapValue?: bigint) => {
  if (supplyCapValue == null || totalSuppliedValue == null) return undefined;
  return supplyCapValue - totalSuppliedValue;
};

interface RemainingCap {
  remainingCap: FetchBigInt | undefined;
  remainingCapUsd: FetchBigInt | undefined;
}

export const useFetchDetailRemainingCap = (asset?: Address): FetchData<RemainingCap> => {
  const { data: supplyCap, ...capsRest } = useFetchReserveCaps(asset);
  const { data: totalSupplied, ...suppliedRest } = useFetchDetailTotalSupplied(asset);
  const { data: price, ...priceRest } = useFetchAssetPrice({ asset });

  const remaining = cRemainingCap(totalSupplied?.totalSupplied?.bigIntValue, supplyCap?.supplyCap.bigIntValue);
  const remainingUsd = cValueInUsd(remaining, price?.bigIntValue, totalSupplied?.totalSupplied?.decimals);

  return {
    ...mergeQueryStates([capsRest, suppliedRest, priceRest]),
    data: {
      remainingCap: fFetchBigIntStructured(remaining, supplyCap?.supplyCap.decimals, supplyCap?.supplyCap.symbol),
      remainingCapUsd: fUsdValueStructured(remainingUsd, price.decimals),
    },
  };
};

export interface ViewDetailRemainingCap {
  tokenAmount?: ViewBigInt;
  dollarAmount?: ViewBigInt;
}
export const useViewDetailRemainingCap = (asset?: Address): Displayable<ViewDetailRemainingCap> => {
  const {
    data: { remainingCap, remainingCapUsd },
    ...rest
  } = useFetchDetailRemainingCap(asset);

  return {
    ...rest,
    data: {
      tokenAmount: remainingCap ? formatFetchBigIntToViewBigInt(remainingCap) : undefined,
      dollarAmount: remainingCapUsd ? formatFetchBigIntToViewBigInt(remainingCapUsd) : undefined,
    },
  };
};
