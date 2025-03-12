import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo } from "./FullVaultInfo.fetch";
import { queryConfig } from "../../settings/queryConfig";
import { mapVaultData } from "../mappers/mapVaultData";
import { MorphoQueryKeys } from "../query-keys";

export const useFetchFormattedFullVaultInfo = (address?: Address, chainId = base.id) => {
  const { data, ...rest } = useQuery({
    queryKey: MorphoQueryKeys.fullVaultInfoHook(address, chainId),
    queryFn: () => fetchFullVaultInfo(address!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data: data ? mapVaultData(data.vaultData.vaultByAddress, data.vaultTokenData) : undefined,
  };
};

export const useFetchRawFullVaultInfo = (address?: Address, chainId = base.id) => {
  const { data, ...rest } = useQuery({
    queryKey: MorphoQueryKeys.fullVaultInfoRawHook(address, chainId),
    queryFn: () => fetchFullVaultInfo(address!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!address,
  });

  return {
    ...rest,
    data,
  };
};
