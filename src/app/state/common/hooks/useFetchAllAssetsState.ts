import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";
import { LendMarketState, StrategyState } from "../types/StateTypes";
import { useSeamlessContractRead } from "../../../../shared";
import { lendingPoolAddress, lendingPoolAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";
import { useMemo } from "react";

/**
 * Fetches all asset states from the blockchain using a smart contract read operation.
 * This hook combines data from multiple sources: the lending pool and configured strategies.
 * It filters out assets that are specified to be hidden and categorizes assets as lending or ILM (Investment Lending Market).
 *
 * @returns An object containing a `state` with a combined list of `LendMarketState` and `StrategyState` along with additional properties for managing the fetch state.
 */
export const useFetchAllAssetsState = (): {
  state: FetchData<(LendMarketState | StrategyState)[]>;
} => {
  // todo: use existing raw query?
  const { data: lendingAssets, ...rest } = useSeamlessContractRead({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReservesList",
    query: {
      ...metadataQueryConfig,
    },
  });

  const lendingMarkets: LendMarketState[] | undefined = lendingAssets
    ?.filter((asset) => {
      return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
    })
    .map((asset) => ({
      address: asset,
      isStrategy: false,
      tags: ["LEND"],
    }));

  // todo: fetch this
  const ilmMarkets: StrategyState[] = [];
  Object.keys(strategiesConfig).forEach((key) => {
    ilmMarkets.push({
      isStrategy: true,
      tags: ["ILM"],
      ...strategiesConfig[key as Address],
    });
  });

  const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

  return {
    state: {
      data,
      ...rest,
    },
  };
};

/**
 * Retrieves a single asset state by its address.
 * This hook is a selector hook that filters the list of all assets by the provided address.
 *
 * @param address The blockchain address of the asset to find.
 * @returns FetchData object containing the found asset state or undefined if no asset matches the address.
 */
export const useStateAssetByAddress = (address?: Address): FetchData<LendMarketState | StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find((x) => x.address === address),
  };
};

/**
 * Retrieves a strategy state by its address.
 * Similar to `useStateAssetByAddress` but specifically filters for strategies.
 *
 * @param address The blockchain address of the strategy to find.
 * @returns FetchData object containing the found strategy state or undefined if no strategy matches the address.
 */
export const useStateStrategyByAddress = (address?: Address): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find((x) => x.address === address && x.isStrategy === true) as StrategyState,
  };
};

/**
 * Determines if a strategy associated with a given address has multiple APYs.
 * This information is typically used to handle display logic in the UI, indicating more complex strategy configurations.
 *
 * @param address The blockchain address of the strategy to check.
 * @returns FetchData object indicating whether the strategy has multiple APYs.
 */
export const useStateHasMultipleAPYs = (address?: Address): FetchData<boolean | undefined> => {
  const { state } = useFetchAllAssetsState();

  // todo, replace with fatched state
  const strategy = address ? strategiesConfig[address] : undefined;
  return {
    ...state,
    data: strategy ? strategy.subStrategyData.length > 1 : false,
  };
};

/**
 * A hook that finds a strategy based on a sub-strategy address by searching through all strategies obtained from the blockchain.
 * This hook ensures that it returns a FetchData object including not just the data, but also loading and fetched statuses.
 *
 * @param subStrategyAddress The address of the sub-strategy to find.
 * @returns FetchData object containing the found strategy or undefined, along with loading and fetched statuses.
 */
export const useStrategyBySubStrategyAddress = (subStrategyAddress?: Address): FetchData<StrategyState | undefined> => {
  const allAssetsState = useFetchAllAssetsState();

  const strategy = useMemo(() => {
    if (!subStrategyAddress) return undefined;

    return allAssetsState.state.data.find(
      (strategy) =>
        strategy.isStrategy &&
        (strategy as StrategyState).subStrategyData.some((sub) => sub.address === subStrategyAddress)
    ) as StrategyState;
  }, [subStrategyAddress, allAssetsState.state.data]);

  // Spread the rest of the state properties (like isLoading and isFetched) and override the data property with the found strategy.
  return {
    ...allAssetsState.state,
    data: strategy,
  };
};
