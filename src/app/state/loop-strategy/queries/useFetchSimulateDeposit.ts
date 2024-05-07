import { Address } from "viem";
import { simulateDeposit } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { mergeQueryStates, useToken } from "@shared";
import { DebouncedDelayConfig } from "../config/DebouncedDelayConfig";

export const useFetchSimulateDeposit = (account: Address, strategy: Address, amount: string) => {
  const {
    data: { symbol, decimals },
    ...tokenRest
  } = useToken(strategy);

  const { data: underlyingAsset, ...underlyingRest } = useFetchStrategyAsset(strategy);

  const { data, ...rest } = useQuery({
    queryKey: ["simulateDeposit", strategy, amount],
    queryFn: () => simulateDeposit(account, strategy, underlyingAsset, amount),
    ...DebouncedDelayConfig,
  });

  return {
    ...mergeQueryStates([tokenRest, underlyingRest, rest]),
    data: {
      bigIntValue: data?.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
