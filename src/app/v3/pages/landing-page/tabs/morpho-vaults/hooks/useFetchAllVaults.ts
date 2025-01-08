import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo } from "../../../../../../statev3/morpho/FullVaultInfo/FullVaultInfo.fetch";
import { queryConfig } from "../../../../../../statev3/settings/queryConfig";
import { mapExtendedAccrualVaultToSimpleVaultData } from "../../../../../../statev3/morpho/mappers/mapExtendedAccrualVaultToSimpleVaultData";

const useFullVaultsInfo = (addresses: Address[], chainId = base.id) => {
  return useQuery({
    queryKey: ["fullVaultsInfo", addresses, chainId],
    queryFn: async () => {
      const results = await Promise.all(addresses.map((address) => fetchFullVaultInfo(address, chainId)));
      return results;
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

  const formattedVaults = rawVaults.map(mapExtendedAccrualVaultToSimpleVaultData);

  return {
    data: formattedVaults,
    isLoading,
    error,
  };
};
