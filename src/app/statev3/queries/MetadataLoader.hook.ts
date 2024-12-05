import { fetchStrategies } from "./Strategies.hook";
import { fetchTokenData, TokenData } from "../metadata/TokenData.fetch";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../settings/queryConfig";

export async function fetchAllStrategyTokenData(): Promise<TokenData[]> {
  const strategies = await fetchStrategies();

  const allStrategyData = await Promise.all(strategies.map((strategy) => fetchTokenData(strategy)));

  return allStrategyData;
}

export const useFetchAllStrategyTokenData = () => {
  return useQuery({
    queryKey: ["hookAllStrategyTokenData"],
    queryFn: fetchAllStrategyTokenData,
    ...disableCacheQueryConfig,
  });
};
