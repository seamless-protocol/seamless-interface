import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";
import { readContract } from "wagmi/actions";
import { useQueries } from "@tanstack/react-query";
import { Fetch, mergeQueryStates } from "@shared";
import { config } from "../../../config/rainbow.config";

export interface StrategyAsset {
  underlying: Address;
  collateral: Address;
  debt: Address;
}

interface StrategyAssetsResponse {
  data: { [address: string]: StrategyAsset | undefined };
}

export const useFetchStrategiesAssets = (strategies: Address[]): Fetch<StrategyAssetsResponse> => {
  const result = useQueries({
    queries: strategies.map((strategy) => ({
      queryKey: ["strategyAssets", strategy],
      queryFn: () => fetchStrategyAssets(strategy),
      ...metadataQueryConfig,
      enabled: !!strategy,
    })),
  });

  const data = result.reduce<{ [address: string]: StrategyAsset | undefined }>((acc, result, index) => {
    acc[strategies[index]] = result.data;
    return acc;
  }, {});

  return {
    ...mergeQueryStates(result),
    data,
  };
};

export const fetchStrategyAssets = async (strategy?: Address) => {
  if (!strategy) return undefined;

  // todo: create wrapper for this? first param should always be config
  return readContract(config, {
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getAssets",
  });
};
