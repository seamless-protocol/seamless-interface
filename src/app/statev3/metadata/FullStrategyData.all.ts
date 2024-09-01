import { Address } from "viem";
import { fetchTokenData, TokenData } from "./TokenData.fetch";
import { fetchStrategyAssets } from "./StrategyAssets.fetch";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { addressIconMap, strategyConfig } from "../settings/config";
import { TagType } from "../common/types/StateTypes";

export interface FullStrategyData extends TokenData {
  underlying: Address;
  collateral: Address;
  debt: Address;
  address: Address;
  type: TagType;
  description: string;
}

export async function fetchFullStrategyData(strategy: Address): Promise<FullStrategyData> {
  const [tokenData, assets] = await Promise.all([fetchTokenData(strategy), fetchStrategyAssets(strategy)]);

  return {
    ...tokenData,
    ...assets,
    ...strategyConfig[strategy],
    icon: addressIconMap.get(strategy) || "",
    address: strategy,
  };
}

export const useFetchFullStrategyData = (strategy?: Address) => {
  return useQuery({
    queryKey: ["hookFullStrategyData", strategy],
    queryFn: () => fetchFullStrategyData(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });
};
