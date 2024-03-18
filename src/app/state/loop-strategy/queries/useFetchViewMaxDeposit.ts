import { Address, zeroAddress } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import {
  Displayable,
  ViewBigInt,
  useSeamlessContractRead,
  useToken,
} from "@shared";
import { loopStrategyAbi } from "../../../generated";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

export const useFetchMaxDeposit = (
  strategy: Address
): FetchData<FetchBigInt> => {
  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { decimals, symbol },
  } = useToken(strategy);

  const {
    data,
    isLoading: isMaxDepositLoading,
    isFetched: isMaxDepositFetched,
    ...rest
  } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "maxDeposit",
    args: [zeroAddress as Address],
  });

  return {
    ...rest,
    isLoading: isTokenDataLoading || isMaxDepositLoading,
    isFetched: isTokenDataFetched && isMaxDepositFetched,
    data: {
      bigIntValue: data || 0n,
      decimals,
      symbol,
    },
  };
};

export const useFetchViewMaxDeposit = (
  strategy: Address
): Displayable<ViewBigInt> => {
  const {
    isLoading,
    isFetched,
    data: maxDeposit,
  } = useFetchMaxDeposit(strategy);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(maxDeposit),
  };
};
