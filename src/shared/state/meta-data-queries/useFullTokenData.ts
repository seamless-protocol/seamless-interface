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

export const useFullTokenData = (asset?: Address | undefined): FetchData<FullTokenData> => {
  const data = asset ? TokenDataDict[asset] : undefined;

  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isFetched: isDecimalsFetched,
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isFetched: isSymbolFetched,
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const {
    data: name,
    isLoading: isNameLoading,
    isFetched: isNameFetched,
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "name",
    query: { ...metadataQueryConfig, enabled: !!asset },
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
