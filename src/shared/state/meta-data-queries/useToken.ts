import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { getConfig } from "../../../app/utils/queryContractUtils";
import { getQueryClient } from "../../../app/contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { queryConfig } from "../../../app/statev3/settings/queryConfig";
import { useQuery } from "@tanstack/react-query";

export interface Token {
  symbol?: string;
  decimals?: number;
}

export async function fetchDecimals(token: Address): Promise<number> {
  const queryClient = getQueryClient();

  const decimals = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: token,
      abi: erc20Abi,
      functionName: "decimals",
    }),
    ...queryConfig.metadataQueryConfig
  });

  return decimals;
}

export async function fetchSymbol(token: Address): Promise<string> {
  const queryClient = getQueryClient();

  const symbol = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: token,
      abi: erc20Abi,
      functionName: "symbol",
    }),
    ...queryConfig.metadataQueryConfig
  });

  return symbol;
}


export async function fetchToken(token: Address): Promise<Token> {
  const [symbol, decimals] = await Promise.all([fetchSymbol(token), fetchDecimals(token)]);

  return {
    symbol,
    decimals
  }
}

// todo reconsider optional param token ticket #218
export const useToken = (asset?: Address): FetchData<Token> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchToken", asset],
    queryFn: () =>
      fetchToken(asset!),
    enabled: !!asset,
    ...queryConfig.disableCacheQueryConfig
  });

  return {
    data: data || {
      symbol: undefined,
      decimals: undefined
    }, ...rest
  };
};
