import { Address } from "viem";
import { rewardsControllerAddress, rewardsControllerAbi } from "@generated";
import { queryContract, queryOptions } from "../../../utils/queryContractUtils";
import { cTotalRewards } from "./UserRewardsByStrategy.math";
import { fetchTokenData } from "../../metadata/TokenData.fetch";
import { fetchAssetPriceInBlock } from "../../queries/AssetPrice.hook";
import { FetchBigInt, FetchBigIntStrict, formatFetchBigInt, formatUsdValue } from "@shared";
import { cValueInUsd } from "../../math/utils";
import { heavyDataQueryConfig } from "../../../state/settings/queryConfig";

export interface FetchRewardsByStrategy {
  info: FetchRewardsByStrategyInfo[];
  totalRewardsUsd: FetchBigInt;
}

export interface FetchRewardsByStrategyInfo {
  rewardsAddress: Address;
  tokenPrice: FetchBigIntStrict;
  dollarAmount: FetchBigIntStrict;
  tokenAmount: FetchBigIntStrict;
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
    ...heavyDataQueryConfig,
  });

  const rewardsInfo: FetchRewardsByStrategyInfo[] = await Promise.all(
    rewardsAddresses.map(async (address, index) => {
      const [{ decimals, symbol }, tokenPrice] = await Promise.all([
        fetchTokenData(address),
        fetchAssetPriceInBlock(address),
      ]);

      const dollarAmount = cValueInUsd(rewardsAmounts[index], tokenPrice.bigIntValue, decimals);

      return {
        rewardsAddress: address,
        tokenAmount: formatFetchBigInt(rewardsAmounts[index], decimals, symbol),
        dollarAmount: formatUsdValue(dollarAmount),
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
