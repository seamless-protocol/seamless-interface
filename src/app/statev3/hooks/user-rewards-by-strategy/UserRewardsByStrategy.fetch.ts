import { Address } from "viem";
import { rewardsControllerAddress, rewardsControllerAbi } from "@generated";
import { queryContract, queryOptions } from "../../../utils/queryContractUtils";
import { cTotalRewards } from "./UserRewardsByStrategy.math";
import { fetchTokenData } from "../../metadata/TokenData.fetch";
import { fetchAssetPriceInBlock } from "../../queries/AssetPrice.hook";
import { FetchBigInt, FetchBigIntStrict, formatUsdValue } from "@shared";

export interface FetchRewardsByStrategy {
  info: FetchRewardsByStrategyInfo[];
  totalRewardsUsd: FetchBigInt;
}

export interface FetchRewardsByStrategyInfo {
  rewardsAddress: Address;
  rewardsAmount: bigint;
  rewardsDecimals: number;
  rewardsSymbol?: string;
  tokenPrice: FetchBigIntStrict;
}

export async function fetchAllUserRewardsByStrategy({
  user,
  strategy,
}: {
  user: Address;
  strategy: Address;
}): Promise<FetchRewardsByStrategy> {
  const [rewardsAddresses, rewardsAmounts] = await queryContract({
    ...queryOptions({
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getAllUserRewards",
      args: [[strategy], user],
    }),
  });

  const rewardsInfo: FetchRewardsByStrategyInfo[] = await Promise.all(
    rewardsAddresses.map(async (address, index) => {
      const [{ decimals, symbol }, tokenPrice] = await Promise.all([
        fetchTokenData(address),
        fetchAssetPriceInBlock(address),
      ]);

      return {
        rewardsAddress: address,
        rewardsAmount: rewardsAmounts[index],
        rewardsDecimals: decimals,
        rewardsSymbol: symbol,
        tokenPrice,
      };
    })
  );

  const totalRewardsUsd = cTotalRewards(rewardsInfo);

  return {
    info: rewardsInfo,
    totalRewardsUsd: formatUsdValue(totalRewardsUsd),
  };
}
