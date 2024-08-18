import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict } from "../../../shared";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";

interface FetchAssetBalanceInput {
  account: Address;
  asset: Address;
}

export async function fetchAssetBalance({ account, asset }: FetchAssetBalanceInput): Promise<FetchBigIntStrict> {
  const [balance, { symbol, decimals }] = await Promise.all([
    queryContract(
      queryOptions({
        address: asset,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      })
    ),

    fetchTokenData(asset),
  ]);

  return {
    bigIntValue: balance,
    decimals,
    symbol,
  };
}
