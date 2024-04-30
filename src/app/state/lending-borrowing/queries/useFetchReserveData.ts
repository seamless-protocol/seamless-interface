import { Address } from "viem";
import { getFetchBigIntStructured, useSeamlessContractRead, useToken } from "@shared";
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
      totalSupplied: getFetchBigIntStructured(totalSupplied, decimals, ""),
      totalBorrowed: getFetchBigIntStructured(totalBorrowed, decimals, ""),
      // todo: 27?
      liquidityRate: getFetchBigIntStructured(liquidityRate, 27, ""),
      variableBorrowRate: getFetchBigIntStructured(variableBorrowRate, 27, ""),
      liquidityIndex: getFetchBigIntStructured(liquidityIndex, 27, ""),
      variableBorrowIndex: getFetchBigIntStructured(variableBorrowIndex, 27, ""),
    },
  };
};
