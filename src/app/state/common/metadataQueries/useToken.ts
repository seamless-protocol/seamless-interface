import { Address, erc20Abi } from "viem";
import { Fetch } from "../../../../shared/types/Fetch";
import { useSeamlessContractRead } from "../../../../shared";

export interface Token {
  symbol: string;
  decimals: number;
}

export const useToken = (token: Address): Fetch<Token> => {
  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isFetched: isDecimalsFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "decimals",
  });

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isFetched: isSymbolFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "symbol",
  });

  return {
    isLoading: isDecimalsLoading || isSymbolLoading,
    isFetched: isDecimalsFetched && isSymbolFetched,
    symbol: symbol || "",
    decimals: decimals || 18,
  };
};
