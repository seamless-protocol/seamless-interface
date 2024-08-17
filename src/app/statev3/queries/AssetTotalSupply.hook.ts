import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict } from "../../../shared";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchTokenData } from "../metadata/TokenData.fetch";

export async function fetchAssetTotalSupply({ asset }: { asset: Address }): Promise<FetchBigIntStrict> {
  const [totalSupply, { symbol, decimals }] = await Promise.all([
    queryContract(
      queryOptions({
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
      })
    ),

    fetchTokenData(asset),
  ]);

  return {
    bigIntValue: totalSupply,
    decimals,
    symbol,
  };
}
