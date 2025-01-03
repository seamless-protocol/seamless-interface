import { Address, erc20Abi } from "viem";
import { FetchData } from "../../types/Fetch";
import { getConfig } from "../../../app/utils/queryContractUtils";
import { getQueryClient } from "../../../app/contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { queryConfig } from "../../../app/statev3/settings/queryConfig";
import { useQuery } from "@tanstack/react-query";
import { fetchTokenLogoFromTrustWallet } from "./fetchTrustWalletLogoUrl";
import { addressIconMap } from "@meta";
import { fetchTokenLogoFromCoinGecko } from "./fetchTokenLogoFromCoinGecko";

export interface Token {
  symbol: string;
  decimals: number;
  logo?: string;
}

export async function fetchDecimals(token: Address): Promise<number> {
  const queryClient = getQueryClient();

  const decimals = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: token,
      abi: erc20Abi,
      functionName: "decimals",
    }),
    ...queryConfig.metadataQueryConfig,
  });

  return decimals;
}

export async function fetchSymbol(token: Address): Promise<string> {
  const queryClient = getQueryClient();

  const symbol = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: token,
      abi: erc20Abi,
      functionName: "symbol",
    }),
    ...queryConfig.metadataQueryConfig,
  });

  return symbol;
}

/**
 * Fetches the logo URL for a given token address.
 * Before fetching from CoinGecko, it checks if the logo is available in the addressIconMap.
 * If not, it fetches the logo from Trust Wallet if it fails, it fetches the logo from CoinGecko.
 */
export async function fetchTokenLogoWithFallbacks(token: Address): Promise<string | undefined> {
  const logoFromConfig = addressIconMap.get(token);
  if (logoFromConfig) return logoFromConfig;
  // eslint-disable-next-line no-console
  console.warn("Logo not found in addressIconMap", token);

  const trustWalletUrl = await fetchTokenLogoFromTrustWallet(token);
  if (trustWalletUrl) return trustWalletUrl;
  console.error("Could not fetch trust wallet logo", token);

  const coinGeckoUrl = await fetchTokenLogoFromCoinGecko(token);
  if (coinGeckoUrl) return coinGeckoUrl;
  console.error("Could not fetch coin gecko logo", token);

  return undefined;
}

export async function fetchToken(token: Address): Promise<Token> {
  const [symbol, decimals, logoURI] = await Promise.all([
    fetchSymbol(token),
    fetchDecimals(token),
    fetchTokenLogoWithFallbacks(token),
  ]);
  if (!symbol || !decimals) {
    throw new Error("Failed to fetch token data");
  }

  return {
    symbol,
    decimals,
    logo: logoURI,
  };
}

interface TokenHookData {
  symbol?: string;
  decimals?: number;
  logo?: string;
}

export const useToken = (asset?: Address): FetchData<TokenHookData> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFetchToken", asset],
    queryFn: () => fetchToken(asset!),
    enabled: !!asset,
    ...queryConfig.disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: data || {
      symbol: undefined,
      decimals: undefined,
      logo: undefined,
    },
  };
};
