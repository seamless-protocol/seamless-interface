import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchVestedSeam, fetchVestedSeamWithDollarAmount } from "./FetchVetchVestedSeam.fetch";
import { GovernanceQueryKeys } from "../../query-keys";

export const useFetchVestedSeam = () => {
  const { address: userAccount } = useAccount();

  return useQuery({
    queryKey: GovernanceQueryKeys.hookFetchVestedSeam(userAccount!),
    queryFn: () => fetchVestedSeam(userAccount!),
    enabled: Boolean(userAccount),
  });
};

export const useFetchVestedSeamWithDollarAmount = () => {
  const { address: userAccount } = useAccount();

  return useQuery({
    queryKey: GovernanceQueryKeys.hookFetchVestedSeamWithDollarAmount(userAccount!),
    queryFn: () => fetchVestedSeamWithDollarAmount(userAccount!),
    enabled: Boolean(userAccount),
  });
};
