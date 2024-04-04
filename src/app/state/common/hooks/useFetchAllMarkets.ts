import { Address } from "viem";
import { useFetchRawReservesList } from "../../lending-borrowing/queries/useFetchRawReservesList";
import { FetchData } from "../../../../shared/types/Fetch";
import { ilmAssetStrategiesMap } from "../../loop-strategy/config/StrategyConfig";

export interface Market {
  address: Address;
  isStrategy: boolean;
}

export const useFetchAllMarkets = (): FetchData<Market[]> => {
  const { data: lendingAssets, isLoading, isFetched } = useFetchRawReservesList();

  const lendingMarkets: Market[] | undefined = lendingAssets?.map((asset) => ({
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
    data: lendingAssets ? [...(lendingMarkets || []), ...ilmMarkets] : undefined,
  };
};
