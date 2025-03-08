import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { fetchExtendedMappedVaultPositions } from "./UserVaultPositions.fetch";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { queryConfig } from "../../../../statev3/settings/queryConfig";
import { MorphoQueryKeys } from "../../query-keys";

export function useFetchUserVaultPositions(chainId = base.id) {
  const { address: userAddress } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: MorphoQueryKeys.userVaultPositionsHook(userAddress, chainId),
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
