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

export const HookFetchTotalAssetsUSDValueQK = (assetAddress?: Address, underlyingAssetAddress?: Address) => [
  "hookFetchTotalAssetsUSDValue",
  assetAddress,
  underlyingAssetAddress,
];

export const useFormattedTotalAssetsUSDValue = (assetAddress?: Address, underlyingAssetAddress?: Address) => {
  return useQuery({
    queryKey: HookFetchTotalAssetsUSDValueQK(assetAddress, underlyingAssetAddress),
    queryFn: () => fetchFormattedTotalAssetsUSDValue(assetAddress!, underlyingAssetAddress!),
    ...queryConfig.disableCacheQueryConfig,
    enabled: Boolean(assetAddress) && Boolean(underlyingAssetAddress),
  });
};
