import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { Displayable, fFetchNumberStructured } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";
import { useFetchReserveData } from "../queries/useFetchReserveData";

// todo: refactor this, should be number || undefined
const cBorrowApy = (borrowRateBigInt?: bigint, decimals?: number): number => {
  if (borrowRateBigInt == null || decimals == null) return 0;
  const borrowApr = formatUnitsToNumber(borrowRateBigInt, decimals);
  return convertAprToApy(borrowApr);
};

export const useFetchBorrowApy = (asset: Address): FetchData<FetchNumber | undefined> => {
  const {
    data: { variableBorrowRate },
    ...rest
  } = useFetchReserveData(asset);

  const borrowApy = cBorrowApy(variableBorrowRate?.bigIntValue, variableBorrowRate?.decimals);

  return {
    ...rest,
    data: fFetchNumberStructured(borrowApy, "%"),
  };
};

export const useFetchViewBorrowApy = (asset: Address): Displayable<ViewApy> => {
  const { data: apy, ...rest } = useFetchBorrowApy(asset);

  return {
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
    ...rest,
  };
};
