import { useQuery } from "@tanstack/react-query";

let lastTimeCalled = 0;
let lastPrice = 0;

export const fetchCoinGeckoAssetPrice = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<number> => {
  const coinGeckoAssetId = queryKey[1];

  // if (lastTimeCalled + 1000 * 60 * 1 < Date.now()) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoAssetId}&vs_currencies=usd&precision=18`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch asset price");
  }

  const {
    [coinGeckoAssetId]: { usd: price },
  } = await res.json();

  lastTimeCalled = Date.now();
  lastPrice = price;

  return price;
  // }

  return lastPrice;
};

export const useFetchCoinGeckoSeamPrice = () => {
  const { data } = useQuery({
    queryKey: ["fetchCoinGeckoAssetPrice", "seamless-protocol"],
    queryFn: fetchCoinGeckoAssetPrice,
  });

  return data;
};
