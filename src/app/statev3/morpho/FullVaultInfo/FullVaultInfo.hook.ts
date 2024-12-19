import { Address } from "viem";
import { base } from '@wagmi/core/chains'
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfo } from "./FullVaultInfo.fetch";
import { queryConfig } from "../../settings/queryConfig";

export const useFullVaultInfo = (address: Address, chainId = base.id) => {
  return useQuery({
    queryKey: ["fullVaultInfo", address, chainId],
    queryFn: () => fetchFullVaultInfo(address, chainId),
    ...queryConfig.disableCacheQueryConfig
  })
}