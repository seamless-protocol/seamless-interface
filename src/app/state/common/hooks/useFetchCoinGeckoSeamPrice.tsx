import { useQuery } from "@tanstack/react-query";

export const fetchCoinGeckoAssetPrice = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<number> => {
  const coinGeckoAssetId = queryKey[1];

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoAssetId}&vs_currencies=usd&precision=18`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch asset price");
  }

  const {
    [coinGeckoAssetId]: { usd: price },
  } = await res.json();

  return price;
};

export const useFetchCoinGeckoSeamPrice = () => {
  const { data } = useQuery({
    queryKey: ["fetchCoinGeckoAssetPrice", "seamless-protocol"],
    queryFn: fetchCoinGeckoAssetPrice,
  });

  return data;
};
