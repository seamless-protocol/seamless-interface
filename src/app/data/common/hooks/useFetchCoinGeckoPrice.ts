import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { strategyConfig } from "../../settings/config";
import { assetsConfig } from "../../settings/landingMarketConfig";
import { ONE_HOUR_IN_MS, disableCacheQueryConfig } from "../../settings/queryConfig";

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
const IGNORE_ADDRESSES = ["0x5607718c64334eb5174CB2226af891a6ED82c7C6", "0x2d1519305D2aAA04ef09333B464A4fD53491b5f4"];

const _fetchCoinGeckoAssetPriceByAddress = async ({ address, precision }: FetchCoinGeckoAssetPriceByAddressParams) => {
  if (!address) {
    return 0n;
  }

  const res = await fetch(
    `${coinGeckoApiUrl}/simple/token_price/base?contract_addresses=${address}&vs_currencies=usd&precision=${precision}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${address} price`);
  }

  const {
    [address]: { usd: price },
  }: CoinGeckoAssetPrice = await res.json();

  return parseUnits(price.toString(), precision);
};

// todo https://basescan.org/address/0x2d1519305D2aAA04ef09333B464A4fD53491b5f4 handle this one?
export const fetchCoinGeckoAssetPriceByAddress = async ({
  address,
  precision,
}: FetchCoinGeckoAssetPriceByAddressParams): Promise<bigint> => {
  const queryClient = getQueryClient();

  const finalAddress = mapAddress(address);

  return queryClient.fetchQuery({
    queryKey: ["fetchCoinGeckoAssetPriceByAddress", finalAddress, precision],
    queryFn: () => _fetchCoinGeckoAssetPriceByAddress({ address: finalAddress, precision }),

    staleTime: ONE_HOUR_IN_MS,
    gcTime: ONE_HOUR_IN_MS,
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
  const assetConfig = assetsConfig[address] || strategyConfig[address];

  const finalAddress = (assetConfig?.coingGeckoConfig?.replaceAddress.toLowerCase() as Address) || lowerCaseAddress;
  if (IGNORE_ADDRESSES.find((val) => val.toLowerCase() === finalAddress) !== undefined) {
    return undefined;
  }

  return finalAddress;
};

const fetchCoinGeckoAssetPricesByAddresses = async (assets: FetchCoinGeckoPricesByAddressParams[]) => {
  return Promise.all(assets.map(({ address, precision }) => fetchCoinGeckoAssetPriceByAddress({ address, precision })));
};

export const useFetchCoinGeckoPricesByAddress = (assets: FetchCoinGeckoPricesByAddressParams[]) => {
  return useQuery({
    queryKey: ["fetchCoinGeckoAssetPricesByAddresses", assets],
    queryFn: () => fetchCoinGeckoAssetPricesByAddresses(assets),
    ...disableCacheQueryConfig,
  });
};
