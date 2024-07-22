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

  const enabled = !!subStrategy && !!account && !!underlyingAsset && Number(amount) > 0;
  const { data, ...rest } = useQuery({
    queryKey: ["simulateDeposit", account, subStrategy, underlyingAsset, amount],
    queryFn: () => simulateDeposit(account, subStrategy!, underlyingAsset!, amount),
    staleTime: FIVE_SECONDS_IN_MS,
    retry: true,
    enabled,
  });

  return {
    ...mergeQueryStates([tokenRest, underlyingRest, enabled ? rest : {
      ...rest,
      // todo: solve this differently, review displayvalue component, and render loading state in different way.
      isFetched: true,
    }]),
    data: {
      bigIntValue: data?.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
