import { convertAprToApy, formatFetchNumberToViewNumber, formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";
import { useFetchReserveData } from "../queries/useFetchReserveData";

export const useFetchSupplyApy = (asset?: Address): FetchData<FetchNumber> => {
  const {
    data: { liquidityRate },
    ...liquidityRest
  } = useFetchReserveData(asset);

  let supplyApy;
  if (liquidityRate) {
    const supplyApr = liquidityRate?.decimals
      ? formatUnitsToNumber(liquidityRate.bigIntValue, liquidityRate?.decimals)
      : undefined;
    supplyApy = supplyApr ? convertAprToApy(supplyApr) : undefined;
  }

  return {
    ...liquidityRest,
    data: {
      value: supplyApy,
      symbol: supplyApy !== undefined ? "%" : "",
    },
  };
};

export const useFetchViewSupplyApy = (asset?: Address): Displayable<ViewApy> => {
  const { data: apy, ...rest } = useFetchSupplyApy(asset);

  return {
    ...rest,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
