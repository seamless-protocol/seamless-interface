import { useQuery } from "@tanstack/react-query";
import { STAKED_SEAM_ADDRESS } from "@meta";
import { fetchStakingAssetRewardsData } from "./FetchAssetRewardsData.fetch";
import { useAccount } from "wagmi";

export const useFetchAssetRewardsData = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["hookFetchAssetRewardsData", STAKED_SEAM_ADDRESS, address],
    queryFn: () => fetchStakingAssetRewardsData(address!),
    enabled: Boolean(address),
  });
};
