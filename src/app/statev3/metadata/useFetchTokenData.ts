import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions, useQuery } from "wagmi/query";
import { Config, useConfig } from "wagmi";

interface TokenData {
  symbol: string;
  decimals: number;
}

export async function fetchTokenData(config: Config, token: Address): Promise<TokenData> {
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
  const config = useConfig();

  return useQuery({
    queryKey: ["fetchTokenData", token],
    queryFn: () => fetchTokenData(config, token!),
    enabled: !!token,
  });
};
