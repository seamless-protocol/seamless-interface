import { Address } from "viem";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchLoopStrategy } from "./LoopStrategy.fetch";
import { queryConfig } from "../../../settings/queryConfig";
import { getTotalSupplyContractQueryOptions } from "../../../common/queries/TotalSupply/TotalSupply.fetch";
import { getEquityContractQueryOptions } from "../Equity/Equity.fetch";
import { getEquityUsdContractQueryOptions } from "../Equity/EquityUsd.fetch";

export const getFetchLoopStrategyQKey = (address?: Address) => [
  {
    scope: "loopStrategy",
    address,
    totalSupply: getTotalSupplyContractQueryOptions(address).queryKey,
    equity: getEquityContractQueryOptions(address).queryKey,
    equityUSD: getEquityUsdContractQueryOptions(address).queryKey,
  },
];

export const useFetchLoopStrategy = (address?: Address) => {
  return useQuery({
    queryKey: getFetchLoopStrategyQKey(address),
    queryFn: () => fetchLoopStrategy(address!),
    enabled: !!address,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};

export const getFetchLoopStrategyQKeyArray = (address?: Address) => [
  "loopStrategy",
  address,
  getTotalSupplyContractQueryOptions(address).queryKey[1],
  getEquityContractQueryOptions(address).queryKey[1],
  getEquityUsdContractQueryOptions(address).queryKey[1],
];

export const useFetchLoopStrategyArray = (address?: Address) => {
  return useQuery({
    queryKey: getFetchLoopStrategyQKeyArray(address),
    queryFn: () => fetchLoopStrategy(address!),
    enabled: !!address,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};

/**
 * Custom hook to fetch Loop Strategies for multiple addresses using `useQueries`.
 *
 * Each address is queried separately, allowing you to invalidate or refetch individual
 * loop strategies rather than the entire list.
 *
 * @param {Address[]} addresses - An array of contract addresses for which to fetch Loop Strategy data.
 * @returns {Array} An array of query results, each corresponding to a loop strategy for an address.
 */
export const useFetchLoopStrategies = (addresses?: Address[]) => {
  return useQueries({
    queries: (addresses || []).map((address) => ({
      queryKey: getFetchLoopStrategyQKey(address),
      queryFn: () => fetchLoopStrategy(address),
      enabled: !!address,
      ...queryConfig.semiSensitiveDataQueryConfig,
    })),
  });
};
