import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict, fetchToken } from "@shared";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";

interface FetchAssetBalanceInput {
  account: Address;
  asset: Address;
}

export async function fetchAssetBalance({ account, asset }: FetchAssetBalanceInput): Promise<FetchBigIntStrict> {
  const [balance, { symbol, decimals }] = await Promise.all([
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: asset,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      }),
    }),
    fetchToken(asset),
  ]);

  return {
    bigIntValue: balance,
    decimals,
    symbol,
  };
}
