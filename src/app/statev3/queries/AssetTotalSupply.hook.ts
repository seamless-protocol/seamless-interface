import { Address, erc20Abi } from "viem";
import { FetchBigIntStrict } from "../../../shared";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { fetchTokenData } from "../metadata/TokenData.fetch";
import { infiniteCacheQueryConfig, platformDataQueryConfig } from "../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

interface FetchTotalSupplyInBlockInput {
  asset: Address;
  blockNumber: bigint | undefined;
}

export async function fetchAssetTotalSupplyInBlock({
  asset,
  blockNumber,
}: FetchTotalSupplyInBlockInput): Promise<FetchBigIntStrict> {
  const cacheConfig = blockNumber ? infiniteCacheQueryConfig : platformDataQueryConfig;

  const [totalSupply, { symbol, decimals }] = await Promise.all([
    queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
        blockNumber,
      }),
      ...cacheConfig,
    }),
    fetchTokenData(asset),
  ]);

  return {
    bigIntValue: totalSupply,
    decimals,
    symbol,
  };
}
