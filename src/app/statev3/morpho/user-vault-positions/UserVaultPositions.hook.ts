import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchExtendedMappedVaultPositions } from "./UserVaultPositions.fetch";
import { useAccount } from "wagmi";
import { whiteListedMorphoVaults } from "@meta";

export const MORPHO_USER_VAULT_POSITIONS_QUERY_KEY = "MORPHO_USER_VAULT_POSITIONS_QUERY_KEY";

export const getFetchUserVaultPositionsQueryKey = (
  userAddress: string,
  whiteListedVaultAddresses?: string[],
  chainId?: number
) => [MORPHO_USER_VAULT_POSITIONS_QUERY_KEY, userAddress, whiteListedVaultAddresses, chainId];

export function useFetchUserVaultPositions(chainId = base.id) {
  const { address: userAddress } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: getFetchUserVaultPositionsQueryKey(userAddress as string, whiteListedMorphoVaults, chainId),
    queryFn: () => fetchExtendedMappedVaultPositions(userAddress!, whiteListedMorphoVaults, chainId),
    ...queryConfig.semiSensitiveDataQueryConfig,
    enabled: !!userAddress,
  });

  return { data, ...rest };
}
