import { Address } from "viem";
import { useFetchUserSupplyTokens } from "./useFetchUserSupplyTokens";
import { useFetchUserDepositStrategies } from "../../ilmv1-deprecated/queries/useFetchUserDepositStrategies";
import { FetchData } from "../../../../shared/types/Fetch";
import { mergeQueryStates } from "../../../../shared";

interface UserStrategies {
  asset: Address;
  strategy?: Address;
}

export const useFetchUserStrategies = (): FetchData<UserStrategies[] | undefined> => {
  const { data: supplyTokens, ...supplyRest } = useFetchUserSupplyTokens();

  const { data: depositStrategies, ...depositRest } = useFetchUserDepositStrategies();

  let strategies: UserStrategies[] | undefined;
  if (depositStrategies) {
    strategies = depositStrategies
      ? depositStrategies.map((strategy) => ({
          asset: strategy!.asset,
          strategy: strategy!.strategy,
        }))
      : [];
  }
  return {
    ...mergeQueryStates([supplyRest, depositRest]),
    data: strategies?.concat(
      supplyTokens.map((token) => ({
        asset: token,
      }))
    ),
  };
};
