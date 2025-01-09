import { Address } from "viem";

interface CoinGeckoTokenResponse {
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

export async function fetchTokenLogoFromCoinGecko(tokenAddress: Address): Promise<string | null> {
  try {
    const url = `${import.meta.env.VITE_COIN_GECKO_API_URL}/coins/base/contract/${tokenAddress}`;
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as CoinGeckoTokenResponse;
    return data.image?.large || null;
  } catch (error) {
    console.error("Failed to fetch token logo from CoinGecko", error);
    return null;
  }
}
