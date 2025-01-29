import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchExtendedMappedVaultPositions } from "./UserVaultPositions.fetch";
import { useAccount } from "wagmi";
import { Address } from "viem";

export const MORPHO_USER_VAULT_POSITIONS_QUERY_KEY = "MORPHO_USER_VAULT_POSITIONS_QUERY_KEY";

export const getHookFetchUserVaultPositionsQueryKey = (
  userAddress?: Address,
  chainId = base.id
) => ["hook", MORPHO_USER_VAULT_POSITIONS_QUERY_KEY, userAddress, chainId];

export function useFetchUserVaultPositions(chainId = base.id) {
  const { address: userAddress } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: getHookFetchUserVaultPositionsQueryKey(userAddress, chainId),
    queryFn: () => fetchExtendedMappedVaultPositions(userAddress!, chainId),
    ...queryConfig.semiSensitiveDataQueryConfig,
    enabled: !!userAddress,
  });

  return { data, ...rest };
}

export function useFetchUserHasPositionInVault(vaultAddress?: Address, chainId = base.id) {
  const { data, ...rest } = useFetchUserVaultPositions(chainId);

  const position = data?.vaultPositions.find((position) => position.mappedVaultDetails.vaultAddress === vaultAddress);

  return {
    data: !!position,
    ...rest,
  };
}
