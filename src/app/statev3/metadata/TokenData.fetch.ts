import { Address, erc20Abi } from "viem";
import { disableCacheQueryConfig, metadataQueryConfig } from "../settings/queryConfig";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
import { addressIconMap } from "../settings/config";
import { readContractQueryOptions } from "wagmi/query";

export interface TokenData {
  icon: string;
  symbol: string;
  decimals: number;
  name: string;
}

export async function fetchTokenData(token: Address): Promise<TokenData> {
  const [symbol, decimals, name] = await Promise.all([
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: token,
        abi: erc20Abi,
        functionName: "symbol",
      }),
      ...metadataQueryConfig,
    }),
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      }),
      ...metadataQueryConfig,
    }),
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: token,
        abi: erc20Abi,
        functionName: "name",
      }),
      ...metadataQueryConfig,
    }),
  ]);

  return {
    name,
    symbol,
    decimals,
    icon: addressIconMap.get(token) || "",
  };
}

export const useFetchTokenData = (asset?: Address) => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookTokenData", asset],
    queryFn: () => fetchTokenData(asset!),
    enabled: !!asset,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      ...data,
      icon: addressIconMap.get(asset || "") || "",
    },
  };
};
