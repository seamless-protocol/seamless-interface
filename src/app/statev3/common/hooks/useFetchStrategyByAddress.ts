import { Address } from "viem";
import { FetchData } from "../../../../shared";
import { StrategyState } from "../types/StateTypes";
import { useFetchAllStrategies } from "./useFetchAllStrategies";

/**
 * Retrieves a strategy state by its address.
 * Similar to `useFetchAssetByAddress` but specifically filters for strategies.
 *
 * @param address The blockchain address of the strategy to find.
 * @returns FetchData object containing the found strategy state or undefined if no strategy matches the address.
 */
export const useFetchStrategyByAddress = (address?: Address): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllStrategies();

  return {
    ...state,
    data: state.data.find((x) => x.address === address && x.isStrategy === true) as StrategyState,
  };
};
