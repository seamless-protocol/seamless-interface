import { Address } from "viem";
import { simulateDeposit } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { mergeQueryStates, useToken } from "@shared";
import { FIVE_SECONDS_IN_MS } from "../../settings/queryConfig";

export const useFetchSimulateDeposit = (account: Address, amount: string, subStrategy?: Address) => {
  const {
    data: { symbol, decimals },
    ...tokenRest
  } = useToken(subStrategy);

  const { data: underlyingAsset, ...underlyingRest } = useFetchStrategyAsset(subStrategy);

  const { data, ...rest } = useQuery({
    queryKey: ["simulateDeposit", subStrategy, amount],
    queryFn: () => simulateDeposit(account, subStrategy!, underlyingAsset!, amount),
    staleTime: FIVE_SECONDS_IN_MS,
    retry: true,
    enabled: !!subStrategy && !!amount && !!underlyingAsset,
  });

  return {
    ...mergeQueryStates([tokenRest, underlyingRest, rest]),
    data: {
      bigIntValue: data?.data.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
