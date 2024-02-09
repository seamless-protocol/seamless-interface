import { useQuery } from "@tanstack/react-query";

interface CoinGeckoAssetPrice {
  [assetId: string]: {
    usd: number;
  };
}

const coinGeckoApiUrl = import.meta.env.VITE_COIN_GECKO_API_URL;

export const fetchCoinGeckoAssetPrice = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<number> => {
  const coinGeckoAssetId = queryKey[1];

  const res = await fetch(
    `${coinGeckoApiUrl}simple/price?ids=${coinGeckoAssetId}&vs_currencies=usd&precision=18`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch asset price");
  }

  const {
    [coinGeckoAssetId]: { usd: price },
  }: CoinGeckoAssetPrice = await res.json();

  return price;
};

export const useFetchCoinGeckoSeamPrice = () => {
  const { data } = useQuery({
    queryKey: ["fetchCoinGeckoAssetPrice", "seamless-protocol"],
    queryFn: fetchCoinGeckoAssetPrice,
  });

  return data;
};
