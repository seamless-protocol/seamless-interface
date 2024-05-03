import { Address } from "viem";
import { fFetchBigIntStructured, useSeamlessContractRead, useToken } from "@shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";

export const useFetchReserveData = (asset?: Address) => {
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
    args: [asset!],
    query: {
      enabled: !!asset
    }
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
      totalSupplied: fFetchBigIntStructured(totalSupplied, decimals, ""),
      totalBorrowed: fFetchBigIntStructured(totalBorrowed, decimals, ""),
      // todo: 27?
      liquidityRate: fFetchBigIntStructured(liquidityRate, 27, ""),
      variableBorrowRate: fFetchBigIntStructured(variableBorrowRate, 27, ""),
      liquidityIndex: fFetchBigIntStructured(liquidityIndex, 27, ""),
      variableBorrowIndex: fFetchBigIntStructured(variableBorrowIndex, 27, ""),
    },
  };
};
