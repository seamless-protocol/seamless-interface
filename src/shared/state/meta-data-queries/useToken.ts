import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { useSeamlessContractRead } from "../../wagmi-wrapper/hooks/useSeamlessContractRead";
import { metadataQueryConfig } from "../settings/config";
import { mergeQueryStates } from "../../formatters/mergeQueryStates";

export interface Token {
  symbol?: string;
  decimals?: number;
}

// todo reconsider optional param token ticket #218
export const useToken = (asset?: Address): FetchData<Token> => {
  const { data: decimals, ...decimalRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: symbol, ...symbolRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  return {
    ...mergeQueryStates([decimalRest, symbolRest]),
    data: {
      symbol,
      decimals,
    },
  };
};
