import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict } from "../../../shared";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchTokenData } from "../metadata/TokenData.fetch";

interface FetchTotalSupplyInBlockInput {
  asset: Address;
  blockNumber: bigint | undefined;
}

export async function fetchAssetTotalSupplyInBlock({
  asset,
  blockNumber,
}: FetchTotalSupplyInBlockInput): Promise<FetchBigIntStrict> {
  const [totalSupply, { symbol, decimals }] = await Promise.all([
    queryContract(
      queryOptions({
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
        blockNumber,
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
