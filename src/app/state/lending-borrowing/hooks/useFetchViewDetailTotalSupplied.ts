import { Address } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { getFetchBigIntStructured, mergeQueryStates } from "@shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ONE_ETHER } from "../../../../meta";

// todo move this interface in some shared file
interface CalculateBigIntReturnType {
  isInfinity?: boolean;
  result?: bigint;
}

interface TotalSupplied {
  totalSupplied: FetchBigInt | undefined;
  totalSuppliedUsd: FetchBigInt | undefined;
  capacity: FetchBigInt | undefined;
}

// small c would be convension for math functions (c - calculate)
// why convesion, i think its better to have f - formatters, c - calculate, use - hooks and so on... to easy provide more context
const cCapacity = (
  totalSuppliedValue?: bigint,
  supplyCapValue?: bigint,
  totalSuppliedDecimals?: number
): CalculateBigIntReturnType | undefined => {
  if (totalSuppliedValue == null || supplyCapValue == null || totalSuppliedDecimals == null) return undefined;

  const divider = supplyCapValue * (10n ** BigInt(totalSuppliedDecimals));

  if (divider === 0n) return {
    isInfinity: true
  }

  return {
    result: totalSuppliedValue * ONE_ETHER * 100n / divider
  }
}

const cTotalSuppliedUsd = (
  totalSuppliedValue?: bigint,
  priceValue?: bigint,
  totalSuppliedDecimals?: number
): CalculateBigIntReturnType | undefined => {
  if (totalSuppliedValue == null || priceValue == null || totalSuppliedDecimals == null) return undefined;

  const divider = (10n ** BigInt(totalSuppliedDecimals));

  if (divider === 0n) return {
    isInfinity: true
  }

  return {
    result: (totalSuppliedValue * priceValue) / divider
  }
}

// to review
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
      // todo infinity: isInfinity
      totalSuppliedUsd: getFetchBigIntStructured(totalSuppliedUsd?.result, 8, "$"), // ,totalSuppliedUsd?.isInfinity
      capacity: getFetchBigIntStructured(capacity?.result, 18, "%") // ,capacity?.isInfinity
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
        // this function would now accept capacity?.isInfinity and add return "∞" as viewvalue (or something else)
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
