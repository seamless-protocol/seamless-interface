import { useReadContract } from "wagmi";
import {
  lendingPoolAbi,
  lendingPoolAddress,
} from "../../../generated/generated";
import {
  convertAprToApy,
  formatFetchNumberToViewNumber,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { Fetch, FetchNumber } from "../../../../shared/types/Fetch";
import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { ViewApy } from "../types/ViewApy";

export interface SupplyApy {
  apy: FetchNumber;
}

export const useFetchSupplyApy = (asset: Address): Fetch<SupplyApy> => {
  const {
    isLoading,
    isFetched,
    data: reserveData,
  } = useReadContract({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReserveData",
    args: [asset],
  });

  let supplyApy = 0;
  if (reserveData) {
    const supplyApr = formatUnitsToNumber(reserveData.currentLiquidityRate, 27);
    supplyApy = convertAprToApy(supplyApr);
  }

  return {
    isLoading,
    isFetched,
    apy: {
      value: supplyApy,
      symbol: supplyApy ? "%" : "",
    },
  };
};

export const useFetchViewSupplyApy = (asset: Address): Displayable<ViewApy> => {
  const { isLoading, isFetched, apy } = useFetchSupplyApy(asset);

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
