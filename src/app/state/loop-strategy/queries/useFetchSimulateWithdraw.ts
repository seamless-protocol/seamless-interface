import { Address } from "viem";
import { simulateWithdraw } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { fFetchBigIntStructured, mergeQueryStates, useToken } from "@shared";
import { DebouncedDelayConfig } from "../config/DebouncedDelayConfig";
import { IS_SIMULATION_DISABLED } from "../../../../globals";

export const useFetchSimulateWithdraw = (account: Address, amount: string, strategy?: Address) => {
  const { data: underlyingAsset, ...strategyAssetRest } = useFetchStrategyAsset(strategy);
  const {
    data: { decimals, symbol },
    ...tokenDataRest
  } = useToken(underlyingAsset);

  const { data, ...rest } = useQuery({
    queryKey: ["simulateWithdraw", strategy, amount, decimals],
    queryFn: () => simulateWithdraw(account, strategy!, amount, decimals!),
    ...DebouncedDelayConfig,
    enabled: !!strategy && !!decimals,
  });

  return {
    ...mergeQueryStates([strategyAssetRest, tokenDataRest, rest]),
    data: fFetchBigIntStructured(IS_SIMULATION_DISABLED ? 0n : data?.data?.assetsToReceive, decimals, symbol),
  };
};
