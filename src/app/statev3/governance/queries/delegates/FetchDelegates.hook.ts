import { useQuery } from "@tanstack/react-query";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { getPowers } from "./FetchDelegates.fetch";
import { isNullableAddressEqual } from "../../../../v3/utils/utils";

export const hookFetchGetPowersQK = (address?: Address) => ["fetchDelegates", address];

export const useFetchDelegates = () => {
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: hookFetchGetPowersQK(address),
    queryFn: () => getPowers(address!),
    enabled: Boolean(address),
  });

  const esSeamDelegated = !isNullableAddressEqual(data?.esSEAMVotingDelegatee, zeroAddress);
  const seamDelegated = !isNullableAddressEqual(data?.seamVotingDelegatee, zeroAddress);
  const stkSeamDelegated = !isNullableAddressEqual(data?.stkseamVotingDelegatee, zeroAddress);

  const hasDelegatedAny = esSeamDelegated || seamDelegated || stkSeamDelegated;

  return {
    data: {
      ...data,
      hasDelegatedAny,
      esSeamDelegated,
      seamDelegated,
      stkSeamDelegated,
    },
    ...rest,
  };
};
