import {
  convertAprToApy,
  formatFetchNumberToViewNumber,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { Displayable } from "../../../../shared";
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
    const supplyApr = formatUnitsToNumber(
      liquidityRate.bigIntValue,
      liquidityRate.decimals
    );
    supplyApy = convertAprToApy(supplyApr);
  }

  return {
    isLoading,
    isFetched,
    data: {
      value: supplyApy,
      symbol: supplyApy ? "%" : "",
    },
  };
};

export const useFetchViewSupplyApy = (asset: Address): Displayable<ViewApy> => {
  const { isLoading, isFetched, data: apy } = useFetchSupplyApy(asset);

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
