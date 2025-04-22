import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchSeamRewards } from "./FetchSeamRewards.fetch";
import { GovernanceQueryKeys } from "../../query-keys";

export const useFetchSeamRewards = () => {
  const { address: userAccount } = useAccount();

  return useQuery({
    queryKey: GovernanceQueryKeys.hookFetchSeamRewards(userAccount!),
    queryFn: () => fetchSeamRewards(userAccount!),
    enabled: Boolean(userAccount),
  });
};
