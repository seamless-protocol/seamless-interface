import { DefaultError, FetchQueryOptions, QueryKey } from "@tanstack/react-query";
import { getQueryClient } from "../contexts/CustomQueryClientProvider";
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
