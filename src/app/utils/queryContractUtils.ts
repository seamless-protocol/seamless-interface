import { DefaultError, FetchQueryOptions, QueryKey } from "@tanstack/react-query";
import { getQueryClient } from "../contexts/CustomQueryClientProvider";
import { Config } from "wagmi";
import { config, extensiveOperationsConfig } from "../config/rainbow.config";
import { IS_TEST_MODE, IS_DEV_MODE } from "../../globals";
import { testConfigContainer } from "../config/demoConnector/testWagmiConfig";

export const getConfig = (): Config => {
  if (IS_TEST_MODE && IS_DEV_MODE) {
    return testConfigContainer.config;
  }
  
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
