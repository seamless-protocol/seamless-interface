import { useQuery } from "@tanstack/react-query";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { getPowers } from "./FetchDelegates.fetch";
import { ONE_HOUR_IN_MS } from "../../../settings/queryConfig";
import { isNullableAddressEqual } from "../../../../v3/utils/utils";

export const hookFetchDelegatesQK = (address?: Address) => ["fetchDelegates", address];

export const useFetchDelegates = () => {
  const { address } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: hookFetchDelegatesQK(address),
    queryFn: () => getPowers(address!),
    staleTime: ONE_HOUR_IN_MS,
    enabled: Boolean(address),
  });

  const esSeamDelegated = !isNullableAddressEqual(data?.esSEAMVotingDelegatee, zeroAddress);
  const seamDelegated = !isNullableAddressEqual(data?.seamVotingDelegatee, zeroAddress);
  const stkseamDelegated = !isNullableAddressEqual(data?.stkseamVotingDelegatee, zeroAddress);

  const hasDelegatedAny = esSeamDelegated || seamDelegated || stkseamDelegated;

  return {
    data: {
      ...data,
      hasDelegatedAny,
      esSeamDelegated,
      seamDelegated,
      stkseamDelegated,
    },
    ...rest,
  };
};
