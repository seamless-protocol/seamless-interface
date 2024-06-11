import { useMemo } from "react";
import { Address } from "viem";
import { FetchData } from "../../../../shared";
import { StrategyState } from "../types/StateTypes";
import { useFetchAllAssets } from "./useFetchAllAssets";

/**
 * A hook that finds a strategy based on a sub-strategy address by searching through all strategies obtained from the blockchain.
 * This hook ensures that it returns a FetchData object including not just the data, but also loading and fetched statuses.
 *
 * @param subStrategyAddress The address of the sub-strategy to find.
 * @returns FetchData object containing the found strategy or undefined, along with loading and fetched statuses.
 */
export const useFetchStrategyBySubStrategyAddress = (
  subStrategyAddress?: Address
): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllAssets();

  const strategy = useMemo(() => {
    if (!subStrategyAddress) return undefined;

    return state.data.find(
      (strategy) =>
        strategy.isStrategy &&
        (strategy as StrategyState).subStrategyData.some((sub) => sub.address === subStrategyAddress)
    ) as StrategyState;
  }, [subStrategyAddress, state.data.length]);

  // Spread the rest of the state properties (like isLoading and isFetched) and override the data property with the found strategy.
  return {
    ...state,
    data: strategy,
  };
};
