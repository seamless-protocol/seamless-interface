import { Address, erc20Abi } from "viem";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { metadataQueryConfig } from "../../state/settings/queryConfig";

interface TokenData {
  symbol: string;
  decimals: number;
}

export async function fetchTokenData(token: Address): Promise<TokenData> {
  const [symbol, decimals] = await Promise.all([
    queryContract({
      ...queryOptions({
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      }),
      ...metadataQueryConfig,
    }),
    queryContract({
      ...queryOptions({
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
