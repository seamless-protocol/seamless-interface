import { Address } from "viem";
import { useSeamlessContractRead, useToken } from "@shared";
import {
  protocolDataProviderAbi,
  protocolDataProviderAddress,
} from "../../../generated";

export const useFetchReserveData = (asset: Address) => {
  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { decimals },
  } = useToken(asset);

  const {
    data,
    isLoading: isReserveDataLoading,
    isFetched: isReserveDataFetched,
    ...rest
  } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveData",
    args: [asset],
  });

  const [
    ,
    ,
    totalSupplied,
    ,
    totalBorrowed,
    liquidityRate,
    variableBorrowRate,
    ,
    ,
    liquidityIndex,
    variableBorrowIndex,
  ] = data || [];

  return {
    isLoading: isTokenDataLoading || isReserveDataLoading,
    isFetched: isTokenDataFetched && isReserveDataFetched,
    ...rest,
    data: {
      totalSupplied: {
        bigIntValue: totalSupplied || 0n,
        decimals: decimals,
        symbol: "",
      },
      totalBorrowed: {
        bigIntValue: totalBorrowed || 0n,
        decimals: decimals,
        symbol: "",
      },
      liquidityRate: {
        bigIntValue: liquidityRate || 0n,
        decimals: 27,
        symbol: "",
      },
      variableBorrowRate: {
        bigIntValue: variableBorrowRate || 0n,
        decimals: 27,
        symbol: "",
      },
      liquidityIndex: {
        bigIntValue: liquidityIndex || 0n,
        decimals: 27,
        symbol: "",
      },
      variableBorrowIndex: {
        bigIntValue: variableBorrowIndex || 0n,
        decimals: 27,
        symbol: "",
      },
    },
  };
};
