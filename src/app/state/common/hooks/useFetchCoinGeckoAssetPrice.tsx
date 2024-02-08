import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

let lastTimeCalled = 100;

export const fetchCoinGeckoAssetPrice = async ({
  queryKey,
}: {
  queryKey: any;
}) => {
  const asset = queryKey[1];
  const coinGeckoAssetId = "seamless-protocol";

  if (lastTimeCalled + 1000 * 60 * 1 < Date.now()) {
    lastTimeCalled = Date.now();
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoAssetId}&vs_currencies=usd&precision=8`
    );
    console.log("res", res);

    if (!res.ok) {
      throw new Error("Failed to fetch asset price");
    }

    const {
      [coinGeckoAssetId]: { usd: price },
    } = await res.json();

    return price;
  }

  return {};
};

export const useFetchCoinGeckoAssetPrice = (asset: any) => {
  const { data } = useQuery({
    queryKey: ["fetchCoinGeckoAssetPrice", asset],
    queryFn: fetchCoinGeckoAssetPrice,
  });
  // switch (asset[0]) {
  // case "SEAM":
  // return [3.5];
  // case "ETH":
  // return [2480.52];
  // default:
  // return [0, 3.515];
  return [0, 0];
  // }
};

export const fetchPrice = () => {
  const { data } = useQuery({
    queryKey: ["fetchCoinGeckoAssetPrice", ""],
    queryFn: fetchCoinGeckoAssetPrice,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  console.log("data from query", data);
};
