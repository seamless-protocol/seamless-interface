import { fetchStrategies } from "../../ilmv1-deprecated/queries/Strategies.hook";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { fetchToken, Token } from "@shared";

export async function fetchAllStrategyTokenData(): Promise<Token[]> {
  const strategies = await fetchStrategies();

  const allStrategyData = await Promise.all(strategies.map((strategy) => fetchToken(strategy)));

  return allStrategyData;
}

export const useFetchAllStrategyTokenData = () => {
  return useQuery({
    queryKey: ["hookAllStrategyTokenData"],
    queryFn: fetchAllStrategyTokenData,
    ...disableCacheQueryConfig,
  });
};
