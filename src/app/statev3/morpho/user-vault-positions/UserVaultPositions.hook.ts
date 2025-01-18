import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { Address } from "viem";
import { fetchExtendedMappedVaultPositions } from "./UserVaultPositions.fetch";

export function useFetchUserVaultPositions(
  userAddress?: Address,
  chainId = base.id
) {
  const { data, ...rest } = useQuery({
    queryKey: ["hookExtendedMappedVaultPositions", userAddress, chainId],
    queryFn: () => fetchExtendedMappedVaultPositions(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });

  return { ...rest, data };
}
