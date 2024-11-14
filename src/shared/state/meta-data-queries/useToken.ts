import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { metadataQueryConfig } from "../settings/config";
import { mergeQueryStates } from "../../formatters/mergeQueryStates";
import { useReadContract } from "wagmi";

export interface Token {
  symbol?: string;
  decimals?: number;
}

// todo reconsider optional param token ticket #218
export const useToken = (asset?: Address): FetchData<Token> => {
  const { data: decimals, ...decimalRest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: symbol, ...symbolRest } = useReadContract({
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
