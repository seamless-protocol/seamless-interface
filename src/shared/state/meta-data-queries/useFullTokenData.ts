import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { useSeamlessContractRead } from "../../wagmi-wrapper/hooks/useSeamlessContractRead";
import { TokenDataDict } from "@meta";
import { metadataQueryConfig } from "../settings/config";
import { mergeQueryStates } from "../../formatters/mergeQueryStates";

export interface FullTokenData {
  symbol?: string;
  decimals?: number;
  logo?: string;
  name?: string;
  shortName?: string;
}

export const useFullTokenData = (asset?: Address | undefined): FetchData<FullTokenData> => {
  const data = asset ? TokenDataDict[asset] : undefined;

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

  const { data: name, ...nameRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "name",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  return {
    ...mergeQueryStates([decimalRest, symbolRest, nameRest]),
    data: {
      ...data,
      symbol,
      name,
      decimals,
    },
  };
};
