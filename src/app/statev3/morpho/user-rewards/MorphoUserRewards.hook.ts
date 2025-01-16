import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchMorphoExtendedMappedUserRewards } from "./MorphoUserRewards.fetch";
import { Address } from "viem";

export function useMorphoExtendedUserRewards(userAddress?: Address, chainId = base.id) {
  return useQuery({
    queryKey: ["userRewards", userAddress, chainId],
    queryFn: () => fetchMorphoExtendedMappedUserRewards(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });
}
