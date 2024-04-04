import { Address } from "viem";
import { useFetchRawReservesList } from "../../lending-borrowing/queries/useFetchRawReservesList";
import { FetchData } from "../../../../shared/types/Fetch";
import { ilmAssetStrategiesMap } from "../../loop-strategy/config/StrategyConfig";
import { lendingAssetToHide } from "../../../../meta";

export interface Market {
  address: Address;
  isStrategy: boolean;
}

export const useFetchAllMarkets = (): FetchData<Market[] | undefined> => {
  const { data: lendingAssets, isLoading, isFetched } = useFetchRawReservesList();

  let lendingMarkets: Market[] | undefined = lendingAssets?.map((asset) => ({
    address: asset,
    isStrategy: false,
  }));

  lendingMarkets = lendingMarkets?.filter((market) => {
    return lendingAssetToHide.indexOf(market.address) === -1;
  });

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
