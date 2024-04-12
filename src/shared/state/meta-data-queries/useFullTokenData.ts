import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { useSeamlessContractRead } from "../../wagmi-wrapper/hooks/useSeamlessContractRead";
import { TokenDataDict } from "@meta";
import { metadataQueryConfig } from "../settings/config";

export interface FullTokenData {
  symbol?: string;
  decimals?: number;
  logo?: string;
  name?: string;
  shortName?: string;
}

export const useFullTokenData = (token: Address | undefined): FetchData<FullTokenData> => {
  const data = token ? TokenDataDict[token] : undefined;

  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isFetched: isDecimalsFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "decimals",
    query: metadataQueryConfig,
  });

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isFetched: isSymbolFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "symbol",
    query: metadataQueryConfig,
  });

  const {
    data: name,
    isLoading: isNameLoading,
    isFetched: isNameFetched,
  } = useSeamlessContractRead({
    address: token,
    abi: erc20Abi,
    functionName: "name",
    query: metadataQueryConfig,
  });

  return {
    isLoading: isDecimalsLoading || isSymbolLoading || isNameLoading,
    isFetched: isDecimalsFetched && isSymbolFetched && isNameFetched,
    data: {
      ...data,
      symbol,
      name,
      decimals,
    },
  };
};
