import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { RQResponse } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";
import { useFetchReserveData } from "../queries/useFetchReserveData";

export const useFetchSupplyApy = (asset: Address): FetchData<FetchNumber> => {
  const {
    isLoading,
    isFetched,
    data: { liquidityRate },
  } = useFetchReserveData(asset);

  let supplyApy = 0;
  if (liquidityRate) {
    const supplyApr = formatUnitsToNumber(liquidityRate.bigIntValue, liquidityRate.decimals);
    supplyApy = convertAprToApy(supplyApr);
  }

  return {
    isLoading,
    isFetched,
    data: {
      value: supplyApy,
      symbol: supplyApy !== undefined ? "%" : "",
    },
  };
};

export const useFetchViewSupplyApy = (asset: Address): RQResponse<ViewApy> => {
  const { isLoading, isFetched, data: apy } = useFetchSupplyApy(asset);

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
