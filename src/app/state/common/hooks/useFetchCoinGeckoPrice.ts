import { useQueries } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { assetsConfig, strategiesConfig } from "../../settings/config";
import { ONE_HOUR } from "../../settings/queryConfig";
import { getQueryClient } from "../../../v2/contexts/CustomQueryClientProvider";

interface CoinGeckoAssetPrice {
  [address: string]: {
    usd: number;
  };
}

interface FetchCoinGeckoAssetPriceByAddressParams {
  address?: Address;
  precision: number;
}

const coinGeckoApiUrl = import.meta.env.VITE_COIN_GECKO_API_URL;
const IGNORE_ADDRESSES = ["0x5607718c64334eb5174CB2226af891a6ED82c7C6"];

export const fetchCoinGeckoAssetPriceByAddress = async ({
  address,
  precision,
}: FetchCoinGeckoAssetPriceByAddressParams): Promise<bigint> => {
  const queryClient = getQueryClient();

  if (!address) {
    return 0n;
  }

  const fetchData = async () => {
    const res = await fetch(
      `${coinGeckoApiUrl}/simple/token_price/base?contract_addresses=${address.toLowerCase()}&vs_currencies=usd&precision=${precision}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch ${address} price`);
    }

    const {
      [address.toLowerCase()]: { usd: price },
    }: CoinGeckoAssetPrice = await res.json();

    return parseUnits(price.toString(), precision);
  };

  return queryClient.fetchQuery({
    queryKey: ["fetchCoinGeckoAssetPriceByAddress", address, precision],
    queryFn: fetchData,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
};

interface FetchCoinGeckoPricesByAddressParams {
  address?: Address;
  precision: number;
}

const mapAddress = (address?: Address): Address | undefined => {
  if (!address) {
    return undefined;
  }

  const lowerCaseAddress = address.toLowerCase() as Address;
  const assetConfig = assetsConfig[address] || strategiesConfig[address];

  const finalAddress = assetConfig?.coingGeckoConfig?.replaceAddress || lowerCaseAddress;
  if (IGNORE_ADDRESSES.find((val) => val.toLowerCase() === finalAddress) !== undefined) {
    return undefined;
  }

  return finalAddress;
};

export const useFetchCoinGeckoPricesByAddress = (assets: FetchCoinGeckoPricesByAddressParams[]) => {
  return useQueries({
    queries: assets.map(({ address, precision }) => ({
      queryKey: ["fetchCoinGeckoAssetPriceByAddress", mapAddress(address), precision],
      queryFn: () => fetchCoinGeckoAssetPriceByAddress({ address: mapAddress(address), precision }),

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,

      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
    })),
  });
};
