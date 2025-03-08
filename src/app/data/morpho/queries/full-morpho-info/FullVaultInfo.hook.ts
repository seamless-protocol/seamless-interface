import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo, fetchFullVaultInfoMapped } from "./FullVaultInfo.fetch";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

export const useFetchFormattedFullVaultInfo = (address?: Address, chainId = base.id) => {
  const { data, ...rest } = useQuery({
    queryKey: ["fullVaultInfo", address, chainId],
    queryFn: () => fetchFullVaultInfoMapped(address!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data,
  };
};

export const useFetchRawFullVaultInfo = (address?: Address, chainId = base.id) => {
  const { data, ...rest } = useQuery({
    queryKey: ["fullVaultInfo", address, chainId],
    queryFn: () => fetchFullVaultInfo(address!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data,
  };
};
