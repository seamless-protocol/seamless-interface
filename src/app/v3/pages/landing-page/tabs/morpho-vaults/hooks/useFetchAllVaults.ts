import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo } from "../../../../../../data/morpho/full-vault-info/FullVaultInfo.fetch";
import { queryConfig } from "../../../../../../data/settings/queryConfig";
import { mapVaultData } from "../../../../../../data/morpho/mappers/mapVaultData";

const useFullVaultsInfo = (addresses: Address[], chainId = base.id) => {
  return useQuery({
    queryKey: ["fullVaultsInfo", addresses, chainId],
    queryFn: async () => {
      const results = await Promise.all(addresses.map((address) => fetchFullVaultInfo(address, chainId)));
      return results.map((res) => {
        return {
          vaultByAddress: res.vaultData.vaultByAddress,
          vaultTokenData: res.vaultTokenData,
        };
      });
    },
    ...queryConfig.disableCacheQueryConfig,
  });
};

export const useFormattedVaultsInfo = (addresses: Address[], chainId = base.id) => {
  const { data: rawVaults, isLoading, error } = useFullVaultsInfo(addresses, chainId);

  if (isLoading || error || !rawVaults) {
    return {
      data: undefined,
      isLoading,
      error,
    };
  }

  const formattedVaults = rawVaults.map((vault) => mapVaultData(vault.vaultByAddress, vault.vaultTokenData));

  return {
    data: formattedVaults,
    isLoading,
    error,
  };
};

export const useFormattedVaultInfo = (address?: Address, chainId = base.id) => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFullVaultInfo", address, chainId],
    queryFn: () => fetchFullVaultInfo(address!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapVaultData(data?.vaultData.vaultByAddress, data?.vaultTokenData) : undefined,
  };
};
