import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { StrategyState } from "../types/StateTypes";
import { strategiesConfig } from "../../settings/config";

/**
 * For now this hook is not fetching anything. It just returns an array of `StrategyState` objects.
 *
 * @returns An object containing a `state`.
 */
export const useFetchAllStrategies = (): {
  state: FetchData<StrategyState[]>;
} => {
  // todo: fetch rest of the things for strategies?
  const strategies: StrategyState[] = [];
  Object.keys(strategiesConfig).forEach((key) => {
    strategies.push({
      isStrategy: true,
      tags: strategiesConfig[key as Address].tags || [],
      ...strategiesConfig[key as Address],
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
