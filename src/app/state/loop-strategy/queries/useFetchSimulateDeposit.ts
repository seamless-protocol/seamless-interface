import { Address } from "viem";
import { simulateDeposit } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { mergeQueryStates, useToken } from "@shared";
import { FIVE_SECONDS_IN_MS } from "../../settings/queryConfig";
import { IS_SIMULATION_DISABLED } from "../../../../globals";

export const useFetchSimulateDeposit = (account: Address, amount: string, subStrategy?: Address) => {
  const {
    data: { symbol, decimals },
    ...tokenRest
  } = useToken(subStrategy);

  const { data: underlyingAsset, ...underlyingRest } = useFetchStrategyAsset(subStrategy);

  const enabled =
    !IS_SIMULATION_DISABLED && !!subStrategy && !!account && !!underlyingAsset && !!decimals && Number(amount) > 0;

  const { data, ...rest } = useQuery({
    queryKey: ["simulateDeposit", account, subStrategy, underlyingAsset, amount, decimals],
    queryFn: () => simulateDeposit(account, subStrategy!, underlyingAsset!, amount, decimals!),
    staleTime: FIVE_SECONDS_IN_MS,
    retry: true,
    enabled,
  });

  return {
    ...mergeQueryStates([
      tokenRest,
      underlyingRest,
      enabled
        ? rest
        : {
            ...rest,
            // todo: solve this differently, review displayvalue component, and render loading state in different way.
            isFetched: true,
          },
    ]),
    data: {
      bigIntValue: IS_SIMULATION_DISABLED ? 0n : data?.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
