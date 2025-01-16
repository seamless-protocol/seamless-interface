import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchMorphoUserRewards } from "./MorphoUserRewards.fetch";
import { Address } from "viem";

export function useMorphoUserRewards(userAddress?: Address, chainId = base.id) {
  return useQuery({
    queryKey: ["userRewards", userAddress, chainId],
    queryFn: () => fetchMorphoUserRewards(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });
}
