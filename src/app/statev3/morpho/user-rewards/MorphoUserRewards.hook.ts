import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchMorphoExtendedMappedUserRewards } from "./MorphoUserRewards.fetch";
import { Address } from "viem";
import { ExtendedUserReward } from "../types/UserReward";
import { FetchData, ViewBigInt } from "@shared";

export interface MorphoUserRewardsData {
  rewards?: ExtendedUserReward[];
  totalUsdValue: bigint;
  totalUsdValueViewValue: ViewBigInt;
}

export function useMorphoExtendedUserRewards(
  userAddress?: Address,
  chainId = base.id
): FetchData<MorphoUserRewardsData | undefined> {
  return useQuery({
    queryKey: ["hookMorphoExtende234dUserRewards", userAddress, chainId],
    queryFn: () => fetchMorphoExtendedMappedUserRewards(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });
}
