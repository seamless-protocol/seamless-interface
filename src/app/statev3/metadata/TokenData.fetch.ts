import { Address, erc20Abi } from "viem";
import { disableCacheQueryConfig, metadataQueryConfig } from "../../state/settings/queryConfig";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
import { strategyConfig } from "../settings/config";
import { TagType } from "../common/types/StateTypes";

export interface TokenData {
  symbol: string;
  decimals: number;
  icon?: string;
  name?: string;
  description?: string;
  type?: TagType;
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
    // todo: remove this! use it only from strategy data
    ...strategyConfig[token],
  };
}

export const useFetchTokenData = (asset?: Address) => {
  return useQuery({
    queryKey: ["hookTokenData", asset],
    queryFn: () => fetchTokenData(asset!),
    enabled: !!asset,
    ...disableCacheQueryConfig,
  });
};
