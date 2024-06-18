import { useQueries } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";

const cacheConfig = {
  // Very aggressive caching due to rate limits
  staleTime: 60 * 60 * 1000, // 60 min
  gcTime: 60 * 60 * 1000, // 60 min
};

interface CoinGeckoAssetPrice {
  [address: string]: {
    usd: number;
  };
}

interface fetchCoinGeckoAssetPriceByAddressParams {
  address?: Address;
  precision: number;
}

const coinGeckoApiUrl = import.meta.env.VITE_COIN_GECKO_API_URL;
const IGNORE_ADDRESSES = ["0x5607718c64334eb5174CB2226af891a6ED82c7C6"];
const REPLACE_ADDRESSES: { [key: string]: string } = {
  // eslint-disable-next-line no-useless-computed-key
  ["0x998e44232bef4f8b033e5a5175bdc97f2b10d5e5"]: "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85",
};

const fetchCoinGeckoAssetPriceByAddress = async ({
  address,
  precision,
}: fetchCoinGeckoAssetPriceByAddressParams): Promise<bigint> => {
  if (!address) {
    return 0n;
  }

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

interface useFetchCoinGeckoPricesByAddressParams {
  address?: Address;
  precision: number;
}

const mapAddress = (address?: Address): Address | undefined => {
  if (!address) {
    return undefined;
  }

  address = address.toLowerCase() as Address;

  address = (REPLACE_ADDRESSES[address]?.toLowerCase() as Address) || address;
  if (IGNORE_ADDRESSES.find((val) => val.toLowerCase() === address) !== undefined) {
    return undefined;
  }

  return address;
};

export const useFetchCoinGeckoPricesByAddress = (assets: useFetchCoinGeckoPricesByAddressParams[]) =>
  useQueries({
    queries: assets.map(({ address, precision }) => ({
      queryKey: ["fetchCoinGeckoAssetPriceByAddress", mapAddress(address), precision],
      queryFn: () => fetchCoinGeckoAssetPriceByAddress({ address: mapAddress(address), precision }),

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchInterval: false,
      refetchIntervalInBackground: false,

      ...cacheConfig,
    })),
  });
