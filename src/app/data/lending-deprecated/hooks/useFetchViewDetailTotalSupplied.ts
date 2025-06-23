import { Address, parseUnits } from "viem";
import { useFetchReserveData } from "../queries/useFetchReserveData";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { fFetchBigIntStructured, mergeQueryStates } from "@shared";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";
import { useFetchReserveCaps } from "../queries/useFetchViewReserveCaps";
import { ONE_ETHER } from "../../../../meta";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

const cCapacityPercentage = (totalSuppliedValue?: bigint, supplyCapValue?: bigint): bigint | undefined => {
  if (totalSuppliedValue == null || supplyCapValue == null) return undefined;

  const divider = supplyCapValue;
  if (divider === 0n) return undefined;

  return (totalSuppliedValue * ONE_ETHER * 100n) / divider;
};

const cCapacityRemainingPercentage = (capacity?: bigint): bigint | undefined => {
  if (capacity == null) return undefined;

  const max = parseUnits("100", 18);
  if (capacity > max) return undefined;

  return max - capacity;
};

interface TotalSupplied {
  totalSupplied: FetchBigInt | undefined;
  totalSuppliedUsd: FetchBigInt | undefined;
  capacityPercentage: FetchBigInt | undefined;
  noSupplyCap?: boolean;
  capacityRemainingPercentage: FetchBigInt | undefined;
}
export const useFetchDetailTotalSupplied = (asset?: Address): FetchData<TotalSupplied> => {
  const { data: reserveCaps, ...rcRest } = useFetchReserveCaps(asset);
  const {
    data: { totalSupplied },
    ...rdRest
  } = useFetchReserveData(asset);
  const { data: price, ...paRest } = useFetchAssetPrice({ asset });

  const capacityPercentage = cCapacityPercentage(totalSupplied?.bigIntValue, reserveCaps?.supplyCap.bigIntValue);

  const capacityRemainingPercentage = cCapacityRemainingPercentage(capacityPercentage);

  const totalSuppliedUsd = cValueInUsd(totalSupplied?.bigIntValue, price?.bigIntValue, totalSupplied?.decimals);

  return {
    ...mergeQueryStates([rcRest, rdRest, paRest]),
    data: {
      totalSupplied,
      totalSuppliedUsd: fFetchBigIntStructured(totalSuppliedUsd, 8, "$"),
      capacityPercentage: fFetchBigIntStructured(capacityPercentage, 18, "%"),
      noSupplyCap: reserveCaps?.supplyCap.bigIntValue === 0n,
      capacityRemainingPercentage: fFetchBigIntStructured(capacityRemainingPercentage, 18, "%"),
    },
  };
};

export const useFetchViewDetailTotalSupplied = (asset?: Address): FetchData<ViewDetailTotalSupplied> => {
  const {
    data: { totalSupplied, totalSuppliedUsd, capacityPercentage, noSupplyCap, capacityRemainingPercentage },
    ...rest
  } = useFetchDetailTotalSupplied(asset);

  const formattedCapacityRemainingPercentage = capacityRemainingPercentage
    ? formatFetchBigIntToViewBigInt(
        capacityRemainingPercentage.bigIntValue !== undefined && capacityRemainingPercentage.bigIntValue < 0n
          ? { ...capacityRemainingPercentage, bigIntValue: 0n }
          : capacityRemainingPercentage,
        {
          singleDigitNumberDecimals: 1,
          doubleDigitNumberDecimals: 1,
          threeDigitNumberDecimals: 0,
        }
      )
    : undefined;

  return {
    ...rest,
    data: {
      totalSupplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupplied),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSuppliedUsd),
      },
      capacityPercentage: formatFetchBigIntToViewBigInt(capacityPercentage, {
        singleDigitNumberDecimals: 1,
        doubleDigitNumberDecimals: 1,
        threeDigitNumberDecimals: 0,
      }),
      capacityRemainingPercentage: formattedCapacityRemainingPercentage,
      noSupplyCap,
    },
  };
};
