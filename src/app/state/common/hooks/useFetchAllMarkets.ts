import { Address } from "viem";
import { useFetchRawReservesList } from "../../lending-borrowing/queries/useFetchRawReservesList";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";

export interface Market {
  address?: Address;
  isStrategy: boolean;
}

export const isEqualMarket = (market: Market, otherMarket: Market) => {
  return market.address === otherMarket.address && market.isStrategy === otherMarket.isStrategy;
};

export const useFetchAllMarkets = (): FetchData<Market[] | undefined> => {
  const { data: lendingAssets, ...rest } = useFetchRawReservesList();

  const lendingMarkets: Market[] | undefined = lendingAssets
    ?.filter((asset) => {
      return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
    })
    .map((asset) => ({
      address: asset,
      isStrategy: false,
    }));

  const ilmMarkets: Market[] = [];

  Object.keys(strategiesConfig).forEach((key) => {
    ilmMarkets.push({
      address: strategiesConfig[key as Address].address,
      isStrategy: true,
    });
  });

  return {
    ...rest,
    data: lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : undefined,
  };
};
