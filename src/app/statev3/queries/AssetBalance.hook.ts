import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict } from "../../../shared";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { walletDataQueryConfig } from "../settings/queryConfig";
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
      ...walletDataQueryConfig,
    }),
    fetchTokenData(asset),
  ]);

  return {
    bigIntValue: balance,
    decimals,
    symbol,
  };
}
