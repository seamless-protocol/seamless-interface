import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo, fetchFullVaultInfoMapped } from "./FullVaultInfo.fetch";
import { MorphoQueryKeys } from "../../query-keys";

export const useFetchFormattedFullVaultInfo = (address?: Address, chainId = base.id) => {
  return useQuery({
    queryKey: MorphoQueryKeys.fullVaultInfoHook(address, chainId),
    queryFn: () => fetchFullVaultInfoMapped(address!, chainId),
    enabled: !!address,
  });
};

export const useFetchRawFullVaultInfo = (address?: Address, chainId = base.id) => {
  return useQuery({
    queryKey: MorphoQueryKeys.fullVaultInfoRaw(address, chainId),
    queryFn: () => fetchFullVaultInfo(address!, chainId),
    enabled: !!address,
  });
};
