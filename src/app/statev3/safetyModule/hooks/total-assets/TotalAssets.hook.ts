import { Address } from "viem";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchTotalAssets } from "./TotalAssets.fetch";
import { useQuery } from "@tanstack/react-query";
import { fetchFormattedTotalAssetsUSDValue } from "./TotalAssets.mapper";

export const HookFetchTotalAssetsQK = (addresss?: Address) => ["hookFetchTotalAssets", addresss];

export const useFetchTotalAssets = (address?: Address) => {
  return useQuery({
    queryKey: HookFetchTotalAssetsQK(address),
    queryFn: () => fetchTotalAssets(address),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });
};

export const HookFetchTotalAssetsUSDValueQK = (addresss?: Address) => ["hookFetchTotalAssetsUSDValue", addresss];

export const useFormattedTotalAssetsUSDValue = (address?: Address) => {
  return useQuery({
    queryKey: HookFetchTotalAssetsUSDValueQK(address),
    queryFn: () => fetchFormattedTotalAssetsUSDValue(address!),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });
};
