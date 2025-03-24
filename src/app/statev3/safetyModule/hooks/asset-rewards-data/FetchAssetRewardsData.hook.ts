import { useQuery } from "@tanstack/react-query";
import { STAKED_SEAM_ADDRESS } from "@meta";
import { fetchStakingAssetRewardsData } from "./FetchAssetRewardsData.fetch";

export const useFetchAssetRewardsData = () => {
  return useQuery({
    queryKey: ["hookFetchAssetRewardsData", STAKED_SEAM_ADDRESS],
    queryFn: () => fetchStakingAssetRewardsData(),
  });
};
