import { Address } from "viem";
import { fFetchBigIntStructured, mergeQueryStates, useSeamlessContractRead, useToken } from "@shared";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";

export const useFetchReserveData = (asset?: Address) => {
  const {
    data: { decimals },
    ...tokenRest
  } = useToken(asset);

  const { data, ...rest } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveData",
    args: [asset!],
    query: {
      enabled: !!asset,
    },
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
    ...mergeQueryStates([tokenRest, rest]),
    data: {
      totalSupplied: fFetchBigIntStructured(totalSupplied, decimals, ""),
      totalBorrowed: fFetchBigIntStructured(totalBorrowed, decimals, ""),
      liquidityRate: fFetchBigIntStructured(liquidityRate, 27, ""),
      variableBorrowRate: fFetchBigIntStructured(variableBorrowRate, 27, ""),
      liquidityIndex: fFetchBigIntStructured(liquidityIndex, 27, ""),
      variableBorrowIndex: fFetchBigIntStructured(variableBorrowIndex, 27, ""),
    },
  };
};
