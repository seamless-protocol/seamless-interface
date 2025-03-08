import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { mapTotalAssetsData } from "../../../../statev3/morpho/mappers/mapTotalAssetsData";
import { fetchTotalAssetsHistorical } from "../../../../data/morpho/queries/total-supply-historical/TotalAssetsHistorical.fetch";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { fetchFullVaultInfo } from "../../../../statev3/morpho/full-vault-info/FullVaultInfo.fetch";
import { configuredVaultAddresses } from "../../../../statev3/settings/config";

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
