import { Address } from "viem";
import { FetchData } from "../../../../shared";
import { strategiesConfig } from "../../settings/config";
import { useFetchAllAssets } from "./useFetchAllAssets";

/**
 * Determines if a strategy associated with a given address has multiple APYs.
 * This information is typically used to handle display logic in the UI, indicating more complex strategy configurations.
 *
 * @param address The blockchain address of the strategy to check.
 * @returns FetchData object indicating whether the strategy has multiple APYs.
 */
export const useFetchStrategyHasMultipleAPYs = (address?: Address): FetchData<boolean | undefined> => {
  const { state } = useFetchAllAssets();

  // todo, replace with fatched state
  const strategy = address ? strategiesConfig[address] : undefined;
  return {
    ...state,
    data: strategy ? strategy.subStrategyData.length > 1 : false,
  };
};
