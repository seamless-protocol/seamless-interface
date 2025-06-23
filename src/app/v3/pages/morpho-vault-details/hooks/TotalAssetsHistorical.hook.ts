import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { mapTotalAssetsData } from "../../../../data/morpho/mappers/mapTotalAssetsData";
import { fetchTotalAssetsHistorical } from "../../../../data/morpho/total-supply-historical/TotalAssetsHistorical.fetch";
import { queryConfig } from "../../../../data/settings/queryConfig";
import { fetchFullVaultInfo } from "../../../../data/morpho/full-vault-info/FullVaultInfo.fetch";
import { configuredVaultAddresses } from "../../../../data/settings/config";

export const useFetchTotalAssets = (address?: Address, chainId: number = base.id, options?: TimeseriesOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchTotalAssets", address, chainId, options],
    queryFn: () => fetchTotalAssetsHistorical(address as string, chainId, options),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapTotalAssetsData(data) : undefined,
  };
};
export const useFetchTotalAssetsForWhitelistedVaults = () => {
  return useQuery({
    queryKey: ["hookFetchTotalAssetsForWhitelistedVaults"],
    queryFn: async () => {
      const results = await Promise.all(configuredVaultAddresses.map((vault) => fetchFullVaultInfo(vault, base.id)));

      const totalAssetsUsd = results
        .map((result) => Number(result?.vaultData.vaultByAddress.state?.totalAssetsUsd))
        .reduce((acc, curr) => acc + curr);

      return totalAssetsUsd;
    },
    ...queryConfig.disableCacheQueryConfig,
  });
};
