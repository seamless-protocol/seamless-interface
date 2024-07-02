import { Address } from "viem";
import { simulateWithdraw } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { fFetchBigIntStructured, mergeQueryStates, useToken } from "@shared";
import { DebouncedDelayConfig } from "../config/DebouncedDelayConfig";

export const useFetchSimulateWithdraw = (account: Address, amount: string, strategy?: Address) => {
  const { data: underlyingAsset, ...strategyAssetRest } = useFetchStrategyAsset(strategy);
  const {
    data: { decimals, symbol },
    ...tokenDataRest
  } = useToken(underlyingAsset);

  const { data, ...rest } = useQuery({
    queryKey: ["simulateWithdraw", strategy, amount],
    queryFn: () => simulateWithdraw(account, strategy!, amount),
    ...DebouncedDelayConfig,
    enabled: !!strategy,
  });

  return {
    ...mergeQueryStates([strategyAssetRest, tokenDataRest, rest]),
    data: fFetchBigIntStructured(data?.data?.assetsToReceive, decimals, symbol),
  };
};
