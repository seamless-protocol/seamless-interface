import { Address } from "viem";

interface CoinGeckoTokenResponse {
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  // other fields as needed
}

export async function fetchTokenLogoFromCoinGecko(tokenAddress: Address): Promise<string | null> {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/base/contract/${tokenAddress}`;
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as CoinGeckoTokenResponse;
    return data.image?.thumb || null;
  } catch (error) {
    console.error("Failed to fetch token logo from CoinGecko", error);
    return null;
  }
}
