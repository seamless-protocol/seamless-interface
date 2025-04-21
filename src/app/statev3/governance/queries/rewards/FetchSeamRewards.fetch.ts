import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchSeamRewards } from "./FetchSeamRewards.hook";

export const useFetchSeamRewards = () => {
  const { address: userAccount } = useAccount();

  return useQuery({
    queryKey: ["fetchSeamRewards", userAccount],
    queryFn: () => fetchSeamRewards(userAccount!),
    enabled: Boolean(userAccount),
  });
};
