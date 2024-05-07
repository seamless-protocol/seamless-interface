import { FetchData } from "../../../../shared/types/Fetch";
import { Incentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { useFetchRawReservesIncentivesData } from "./useFetchRawReservesIncentivesData";

/**
 * Fetches incentives data for given asset from smart contract. Data is not formatted to be used directly in UI.
 * Fetches data for all assets in lending pool and filters out the one for given asset
 * @param asset Asset to fetch incentives for
 * @returns Returns raw incentives data for given asset from smart contract. Data is not formatted due to complexity of structure
 */
export const useFetchRawReservesIncentivesDataByAsset = (asset?: string): FetchData<Incentives | undefined> => {
  const { data, isLoading, isFetched } = useFetchRawReservesIncentivesData();

  const incentives = data?.find((e: any) => e.underlyingAsset === asset) as Incentives | undefined;

  return {
    isLoading,
    isFetched,
    data: incentives,
  };
};
