import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { strategyConfigv2 } from "../../settings/config";
import { LendMarketState, StrategyState } from "../types/StateTypes";

/**
 * For now this hook is not fetching anything. It just returns an array of `StrategyState` objects.
 *
 * @returns An object containing a `state`.
 */
export const useFetchAllStrategies = (): {
  state: FetchData<(LendMarketState | StrategyState)[]>;
} => {
  // todo: fetch rest of the things for strategies?
  const strategies: StrategyState[] = [];
  Object.keys(strategyConfigv2).forEach((key) => {
    strategies.push({
      isStrategy: true,
      tags: strategyConfigv2[key as Address].tags || [],
      ...strategyConfigv2[key as Address],
    });
  });

  return {
    state: {
      data: strategies,
      ...{
        isFetched: true,
        isLoading: false,
      },
    },
  };
};
