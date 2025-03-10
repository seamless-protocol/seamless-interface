import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { TimeseriesOptions } from "../../../../../generated-graphql";
import { fetchTotalAssetsHistoricalMapped } from "./TotalAssetsHistorical.fetch";
import { configuredVaultAddresses } from "../../../../statev3/settings/config";
import { fetchFullVaultInfo } from "../full-morpho-info/FullVaultInfo.fetch";
import { Address } from "viem";
import { MorphoQueryKeys } from "../../query-keys";

export const useFetchTotalAssets = (address?: Address, chainId: number = base.id, options?: TimeseriesOptions) => {
  const { data, ...rest } = useQuery({
    queryKey: MorphoQueryKeys.totalAssetsHistoricalHook(address, chainId, options),
    queryFn: () => fetchTotalAssetsHistoricalMapped(address as string, chainId, options),
    enabled: !!address,
  });

  return {
    ...rest,
    data,
  };
};
export const useFetchTotalAssetsForWhitelistedVaults = () => {
  return useQuery({
    queryKey: MorphoQueryKeys.totalAssetsForWhitelistedHook(),
    queryFn: async () => {
      const results = await Promise.all(configuredVaultAddresses.map((vault) => fetchFullVaultInfo(vault, base.id)));

      const totalAssetsUsd = results
        .map((result) => Number(result?.vaultData.vaultByAddress.state?.totalAssetsUsd))
        .reduce((acc, curr) => acc + curr);

      return totalAssetsUsd;
    },
  });
};
