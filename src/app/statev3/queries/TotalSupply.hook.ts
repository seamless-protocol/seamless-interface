import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict, fetchToken } from "@shared";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";

interface FetchTotalSupplyInput {
  asset: Address;
}

export async function fetchTotalSupply({ asset }: FetchTotalSupplyInput): Promise<FetchBigIntStrict> {
  const [totalSupply, { symbol, decimals }] = await Promise.all([
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
      }),
    }),
    fetchToken(asset),
  ]);

  return {
    bigIntValue: totalSupply,
    decimals,
    symbol,
  };
}
