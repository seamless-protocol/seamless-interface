import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchExtendedMappedVaultPositions } from "./UserVaultPositions.fetch";
import { useAccount } from "wagmi";

export function useFetchUserVaultPositions(chainId = base.id) {
  const { address: userAddress } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["hookExtendedMappedVaultPositions", userAddress, chainId],
    queryFn: () => fetchExtendedMappedVaultPositions(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });

  return { data, ...rest };
}
