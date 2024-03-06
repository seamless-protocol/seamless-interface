import { Address } from "viem";
import { Fetch } from "../../../../shared/types/Fetch";
import { useFetchAssetDecimals } from "../metadataQueries/useFetchAssetDecimals";
import { useFetchAssetSymbol } from "../metadataQueries/useFetchAssetSymbol";

export interface Token {
  symbol: string;
  decimals: number;
}

export const useToken = (token: Address): Fetch<Token> => {
  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isFetched: isDecimalsFetched,
  } = useFetchAssetDecimals(token);

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isFetched: isSymbolFetched,
  } = useFetchAssetSymbol(token);

  return {
    isLoading: isDecimalsLoading || isSymbolLoading,
    isFetched: isDecimalsFetched && isSymbolFetched,
    symbol: symbol || "",
    decimals: decimals || 18,
  };
};
