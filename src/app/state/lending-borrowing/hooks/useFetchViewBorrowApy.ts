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

export const useFetchBorrowApy = (asset: Address): Fetch<SupplyApy> => {
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

  let borrowApy = 0;
  if (reserveData) {
    const borrowApr = formatUnitsToNumber(
      reserveData.currentVariableBorrowRate,
      27
    );
    borrowApy = convertAprToApy(borrowApr);
  }

  return {
    isLoading,
    isFetched,
    apy: {
      value: borrowApy,
      symbol: borrowApy ? "%" : "",
    },
  };
};

export const useFetchViewBorrowApy = (asset: Address): Displayable<ViewApy> => {
  const { isLoading, isFetched, apy } = useFetchBorrowApy(asset);

  return {
    isLoading,
    isFetched,
    data: {
      apy: formatFetchNumberToViewNumber(apy),
    },
  };
};
