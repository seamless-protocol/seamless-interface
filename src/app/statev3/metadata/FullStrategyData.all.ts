import { Address } from "viem";
import { fetchTokenData } from "./TokenData.fetch";
import { fetchStrategyAssets } from "./StrategyAssets.fetch";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { addressIconMap, strategyConfig } from "../settings/config";
import { TagType } from "../common/types/StateTypes";
import { Displayable } from "../../../shared";

export interface FullStrategyData {
  underlying?: Address;
  collateral?: Address;
  debt?: Address;
  type: TagType;
  description: string;
  address?: Address;

  icon: string;
  symbol?: string;
  decimals?: number;
  name: string;
}

export async function fetchFullStrategyData(strategy: Address): Promise<FullStrategyData> {
  const [tokenData, assets] = await Promise.all([fetchTokenData(strategy), fetchStrategyAssets(strategy)]);

  const config = strategy ? strategyConfig[strategy] : undefined;
  if (!config) throw new Error(`No config found for ${strategy}`);

  return {
    ...tokenData,
    ...assets,
    icon: strategy ? addressIconMap.get(strategy) || "" : "",
    address: strategy,
    ...config,
  };
}

export const useFetchFullStrategyData = (strategy?: Address): Displayable<FullStrategyData | undefined> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFullStrategyData", strategy],
    queryFn: () => fetchFullStrategyData(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  const config = strategy ? strategyConfig[strategy] : undefined;
  if (!config) throw new Error(`No config found for ${strategy}`);

  return {
    ...rest,
    data: {
      ...data,
      address: strategy,
      icon: addressIconMap.get(strategy || "") || "",
      ...config,
    },
  };
};
