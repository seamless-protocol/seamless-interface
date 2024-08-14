import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { useQuery } from "@tanstack/react-query";
import { config } from "../../config/rainbow.config";

interface TokenData {
  symbol: string;
  decimals: number;
}

export async function fetchTokenData(token: Address): Promise<TokenData> {
  const queryClient = getQueryClient();

  const [symbol, decimals] = await Promise.all([
    queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      })
    ),
    queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      })
    ),
  ]);

  return {
    symbol,
    decimals,
  };
}

export const useFetchTokenData = (token: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchTokenData", token],
    queryFn: () => fetchTokenData(token!),
    enabled: !!token,
  });
};
