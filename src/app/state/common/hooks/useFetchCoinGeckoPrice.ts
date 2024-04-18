import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { SEAM_ADDRESS } from "@meta";

interface CoinGeckoAssetPrice {
  [assetId: string]: {
    usd: number;
  };
}

interface fetchCoinGeckoAssetPriceByAddress {
  address: Address;
  precision: number;
}

const coinGeckoApiUrl = import.meta.env.VITE_COIN_GECKO_API_URL;

export const fetchCoinGeckoAssetPriceByAddress = async ({
  address,
  precision,
}: fetchCoinGeckoAssetPriceByAddress): Promise<bigint> => {
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

interface useFetchCoinGeckoPriceByAddress {
  address?: Address;
  precision: number;
}

export const useFetchCoinGeckoPriceByAddress = ({ address, precision }: useFetchCoinGeckoPriceByAddress) =>
  useQuery({
    queryKey: ["fetchCoinGeckoAssetPriceByAddress", address?.toLowerCase(), precision],
    queryFn: () => fetchCoinGeckoAssetPriceByAddress({ address: address!, precision }),

    // Very aggressive caching due to rate limits
    staleTime: 60 * 60 * 1000, // 60 min
    gcTime: 60 * 60 * 1000, // 60 min
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false, 
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

export const useFetchCoinGeckoSeamPrice = () => {
  const { data } = useFetchCoinGeckoPriceByAddress({ address: SEAM_ADDRESS, precision: 18 });

  return data;
};
