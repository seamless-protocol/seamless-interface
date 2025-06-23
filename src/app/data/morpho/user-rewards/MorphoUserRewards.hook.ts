import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { queryConfig } from "../../settings/queryConfig";
import { fetchMorphoExtendedMappedUserRewards } from "./MorphoUserRewards.fetch";
import { Address } from "viem";
import { ExtendedUserReward } from "../types/UserReward";
import { ViewBigInt } from "@shared";

export interface MorphoUserRewardsData {
  rewards?: ExtendedUserReward[];
  totalUsdValue: bigint;
  combinedClaimableNowViewValue: ViewBigInt;
  combinedClaimableNextViewValue: ViewBigInt;
}

export function useMorphoExtendedUserRewards(userAddress?: Address, chainId = base.id) {
  return useQuery({
    queryKey: ["hookMorphoExtendedUserRewards", userAddress, chainId],
    queryFn: () => fetchMorphoExtendedMappedUserRewards(userAddress!, chainId),
    ...queryConfig.disableCacheQueryConfig,
    enabled: !!userAddress,
  });
}
