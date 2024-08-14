import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { Config } from "wagmi";
import { metadataQueryConfig } from "../../state/settings/queryConfig";

interface TokenData {
  symbol: string;
  decimals: number;
}

export async function fetchTokenData(config: Config, token: Address): Promise<TokenData> {
  const queryClient = getQueryClient();

  const [symbol, decimals] = await Promise.all([
    queryClient.fetchQuery({
      ...readContractQueryOptions(config, {
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      }),
      ...metadataQueryConfig,
    }),
    queryClient.fetchQuery({
      ...readContractQueryOptions(config, {
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      }),
      ...metadataQueryConfig,
    }),
  ]);

  return {
    symbol,
    decimals,
  };
}
