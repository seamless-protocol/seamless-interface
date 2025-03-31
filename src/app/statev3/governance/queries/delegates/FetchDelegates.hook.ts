import { useQuery } from "@tanstack/react-query";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { getPowers } from "./FetchDelegates.fetch";
import { ONE_HOUR_IN_MS } from "../../../settings/queryConfig";

export const hookFetchDelegatesQK = (address?: Address) => ["fetchDelegates", address];

export const useFetchDelegates = () => {
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: hookFetchDelegatesQK(address),
    queryFn: () => getPowers(address!),
    staleTime: ONE_HOUR_IN_MS,
    enabled: Boolean(address),
  });
  console.log({ data });

  const hasAnyVotingPower =
    data?.esSEAMVotingDelegatee !== zeroAddress ||
    data?.seamVotingDelegatee !== zeroAddress ||
    data?.stkseamVotingDelegatee !== zeroAddress;

  return {
    data: {
      ...data,
      hasAnyVotingPower,
    },
    ...rest,
  };
};
