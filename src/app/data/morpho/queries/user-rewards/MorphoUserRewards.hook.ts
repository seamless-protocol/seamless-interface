import { useQuery } from "@tanstack/react-query";
import { base } from "viem/chains";
import { fetchMorphoExtendedMappedUserRewards } from "./MorphoUserRewards.fetch";
import { Address } from "viem";
import { FetchData, ViewBigInt } from "@shared";
import { ExtendedUserReward } from "./UserReward.type";
import { MorphoQueryKeys } from "../../query-keys";

export interface MorphoUserRewardsData {
  rewards?: ExtendedUserReward[];
  totalUsdValue: bigint;
  combinedClaimableNowViewValue: ViewBigInt;
  combinedClaimableNextViewValue: ViewBigInt;
}

export function useMorphoExtendedUserRewards(
  userAddress?: Address,
  chainId = base.id
): FetchData<MorphoUserRewardsData | undefined> {
  return useQuery({
    queryKey: MorphoQueryKeys.extendedUserRewardsHook(userAddress, chainId),
    queryFn: () => fetchMorphoExtendedMappedUserRewards(userAddress!, chainId),
    enabled: !!userAddress,
  });
}
