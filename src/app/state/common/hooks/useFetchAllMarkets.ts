import { Address } from "viem";
import { useFetchRawReservesList } from "../../lending-borrowing/queries/useFetchRawReservesList";
import { FetchData } from "../../../../shared/types/Fetch";
import { ilmAssetStrategiesMap } from "../../loop-strategy/config/StrategyConfig";
import { lendingAssetToHide } from "../../../../meta";

export interface Market {
  address: Address;
  isStrategy: boolean;
}

export const isEqualMarket = (market: Market, otherMarket: Market) => {
  return market.address === otherMarket.address && market.isStrategy === otherMarket.isStrategy;
};

export const useFetchAllMarkets = (): FetchData<Market[] | undefined> => {
  const { data: lendingAssets, isLoading, isFetched } = useFetchRawReservesList();

  const lendingMarkets: Market[] | undefined = lendingAssets
    ?.filter((asset) => {
      return lendingAssetToHide.indexOf(asset) === -1;
    })
    .map((asset) => ({
      address: asset,
      isStrategy: false,
    }));

  const ilmMarkets: Market[] = [];

  ilmAssetStrategiesMap.forEach((_, asset) => {
    ilmMarkets.push({
      address: asset,
      isStrategy: true,
    });
  });

  return {
    isLoading,
    isFetched,
    data: lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : undefined,
  };
};
