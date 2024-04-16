import { Address } from "viem";
import { useFetchUserSupplyTokens } from "./useFetchUserSupplyTokens";
import { useFetchUserDepositStrategies } from "../../loop-strategy/hooks/useFetchUserDepositStrategies";
import { FetchData } from "../../../../shared/types/Fetch";

interface UserStrategies {
  asset: Address;
  strategy?: Address;
}

export const useFetchUserStrategies = (): FetchData<UserStrategies[] | undefined> => {
  const {
    isLoading: isSupplyTokensLoading,
    isFetched: isSupplyTokensFetched,
    data: supplyTokens,
  } = useFetchUserSupplyTokens();

  const {
    data: depositStrategies,
    isLoading: isDepositStrategiesLoading,
    isFetched: isDepositStrategiesFetched,
  } = useFetchUserDepositStrategies();

  let strategies: UserStrategies[] | undefined;
  if (supplyTokens && depositStrategies) {
    strategies = supplyTokens
      .map((token) => ({
        asset: token,
      }))
      .concat(
        depositStrategies.map((strategy) => ({
          asset: strategy.asset,
          strategy: strategy.strategy,
        }))
      );
  }

  return {
    isLoading: isSupplyTokensLoading || isDepositStrategiesLoading,
    isFetched: isSupplyTokensFetched && isDepositStrategiesFetched,
    data: strategies,
  };
};
