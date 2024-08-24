import { DefaultError, FetchQueryOptions, QueryKey } from "@tanstack/react-query";
import { getQueryClient } from "../contexts/CustomQueryClientProvider";
import { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import { ReadContractOptions, readContractQueryOptions } from "wagmi/query";
import { Config } from "wagmi";
import { config, extensiveOperationsConfig } from "../config/rainbow.config";

export const getConfig = (): Config => {
  return config;
};

export const getExtensiveOperationsConfig = (): Config => {
  return extensiveOperationsConfig;
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
