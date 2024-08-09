import { useMemo } from "react";
import { Address } from "viem";
import { FetchData } from "../../../../shared";
import { StrategyState } from "../types/StateTypes";
import { useFetchAllAssets } from "./useFetchAllAssets";
import { useFetchStrategyByAddress } from "./useFetchStrategyByAddress";

/**
 * A hook that finds a strategy based on a sub-strategy address by searching through all strategies obtained from the blockchain.
 * This hook ensures that it returns a FetchData object including not just the data, but also loading and fetched statuses.
 *
 * @param address The address of the sub-strategy to find.
 * @returns FetchData object containing the found strategy or undefined, along with loading and fetched statuses.
 */
export const useFetchStrategyBySubStrategyAddressOrAddress = (
  address?: Address
): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllAssets();
  const { data: strategyByAddress } = useFetchStrategyByAddress(address);

  const strategy = useMemo(() => {
    if (!address || strategyByAddress) return undefined;

    return state.data.find(
      (strategy) =>
        strategy.isStrategy &&
        (strategy as StrategyState).subStrategyData.some((sub) => sub.address === address)
    ) as StrategyState;
  }, [address, state.data.length]);

  // Spread the rest of the state properties (like isLoading and isFetched) and override the data property with the found strategy.
  return {
    ...state,
    data: strategyByAddress || strategy,
  };
};
