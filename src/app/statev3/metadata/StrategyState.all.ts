import { Address } from "viem";
import { fetchTokenData, TokenData } from "./TokenData.fetch";
import { fetchStrategyAssets } from "./StrategyAssets.fetch";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";

export interface FullStrategyData extends TokenData {
  underlying: Address;
  collateral: Address;
  debt: Address;
  address: Address;
}

export async function fetchFullStrategyData(strategy: Address): Promise<FullStrategyData> {
  const [tokenData, { underlying, collateral, debt }] = await Promise.all([
    fetchTokenData(strategy),
    fetchStrategyAssets(strategy),
  ]);

  return {
    ...tokenData,
    underlying,
    collateral,
    debt,
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
