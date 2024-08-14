// src/utils/queryClient.ts
import { DefaultError, FetchQueryOptions, QueryClient, QueryClientProvider, QueryKey } from "@tanstack/react-query";
import React from "react";
import { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import { Config } from "wagmi";
import { ReadContractOptions, readContractQueryOptions } from "wagmi/query";
import { config } from "../config/rainbow.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// This is due to an issue with react-query serializing cache keys with bigint args. https://github.com/TanStack/query/issues/3082
// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const getQueryClient = (): QueryClient => {
  return queryClient;
};

export const getConfig = (): Config => {
  return config;
};

export async function queryContract<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
>(options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>): Promise<TData> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery(options);
}

export function queryOptions<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
>(options: ReadContractOptions<abi, functionName, args, Config> = {} as any) {
  return readContractQueryOptions(getConfig(), options);
}

export const CustomQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
