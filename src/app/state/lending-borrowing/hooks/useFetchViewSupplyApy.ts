import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";
import { useFetchReserveData } from "../queries/useFetchReserveData";

export const useFetchSupplyApy = (asset: Address): FetchData<FetchNumber> => {
  const {
    data: { liquidityRate },
    ...liquidityRest
  } = useFetchReserveData(asset);

  let supplyApy = 0;
  if (liquidityRate) {
    const supplyApr = formatUnitsToNumber(liquidityRate.bigIntValue, liquidityRate.decimals);
    supplyApy = convertAprToApy(supplyApr);
  }

  return {
    ...liquidityRest,
    data: {
      value: supplyApy,
      symbol: supplyApy !== undefined ? "%" : "",
    },
  };
};

export const useFetchViewSupplyApy = (asset: Address): Displayable<ViewApy> => {
  const { data: apy, ...rest } = useFetchSupplyApy(asset);

  return {
    ...rest,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
