import { useQuery } from "@tanstack/react-query";
import { STAKED_SEAM_ADDRESS } from "@meta";
import { fetchStakingAssetRewardsData } from "./FetchAssetRewardsData.fetch";
import { formatIncentiveAprToViewNumber } from "../../../../../shared";

export const useFetchAssetRewardsData = () => {
  return useQuery({
    queryKey: ["hookFetchAssetRewardsData", STAKED_SEAM_ADDRESS],
    queryFn: () => fetchStakingAssetRewardsData(),
  });
};

export const useFetchViewAssetsRewardsData = () => {
  const { data, ...rest } = useFetchAssetRewardsData();

  return {
    data: {
      ...data,
      totalApr: formatIncentiveAprToViewNumber(data?.totalApr),
    },
    ...rest,
  };
};
