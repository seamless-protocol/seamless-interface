import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { RQResponse } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";
import { useFetchReserveData } from "../queries/useFetchReserveData";

export const useFetchBorrowApy = (asset: Address): FetchData<FetchNumber> => {
  const {
    isLoading,
    isFetched,
    data: { variableBorrowRate },
  } = useFetchReserveData(asset);

  let borrowApy = 0;
  if (variableBorrowRate) {
    const borrowApr = formatUnitsToNumber(variableBorrowRate.bigIntValue, variableBorrowRate.decimals);
    borrowApy = convertAprToApy(borrowApr);
  }

  return {
    isLoading,
    isFetched,
    data: {
      value: borrowApy,
      symbol: borrowApy !== undefined ? "%" : "",
    },
  };
};

export const useFetchViewBorrowApy = (asset: Address): RQResponse<ViewApy> => {
  const { isLoading, isFetched, data: apy } = useFetchBorrowApy(asset);

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
