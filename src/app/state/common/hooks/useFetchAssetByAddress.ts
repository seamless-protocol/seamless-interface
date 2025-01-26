import { Address } from "viem";
import { FetchData } from "../../../../shared";
import { LendMarketState, StrategyState } from "../types/StateTypes";
import { useFetchAllAssets } from "./useFetchAllAssets";

/**
 * Retrieves a single asset state by its address.
 * This hook is a selector hook that filters the list of all assets by the provided address.
 *
 * @param address The blockchain address of the asset to find.
 * @returns FetchData object containing the found asset state or undefined if no asset matches the address.
 */
export const useFetchAssetByAddress = (address?: Address): FetchData<LendMarketState | StrategyState | undefined> => {
  const { state } = useFetchAllAssets();

  return {
    ...state,
    data: state.data.find((x) => x.address === address),
  };
};
