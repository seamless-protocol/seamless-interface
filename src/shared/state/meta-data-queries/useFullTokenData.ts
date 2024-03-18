import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { useSeamlessContractRead } from "../../wagmi-wrapper/hooks/useSeamlessContractRead";
import { TokenDataDict } from "@meta";

export interface FullTokenData {
  symbol: string;
  decimals: number;
  logo?: string;
  name?: string;
  shortName?: string;
}

export const useFullTokenData = (token: Address): FetchData<FullTokenData> => {
  const data = TokenDataDict[token];

  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isFetched: isDecimalsFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "decimals",
    query: {
      staleTime: Infinity,
    },
  });

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isFetched: isSymbolFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "symbol",
    query: {
      staleTime: Infinity,
    },
  });

  return {
    isLoading: isDecimalsLoading || isSymbolLoading,
    isFetched: isDecimalsFetched && isSymbolFetched,
    data: {
      ...data,
      symbol: symbol || data.symbol || "",
      decimals: decimals || data.decimals || 18,
    },
  };
};
