import { Address } from "viem";
import { rewardsControllerAddress, rewardsControllerAbi } from "@generated";
import { metadataQueryConfig } from "../../../state/settings/queryConfig";
import { queryContract, queryOptions } from "../../../utils/queryContractUtils";
import { calculateTotalRewards, RewardsByStrategy, RewardsByStrategyInfo } from "./UserRewardsByStrategy.math";
import { fetchTokenData } from "../../metadata/TokenData.fetch";
import { fetchAssetPriceInBlock } from "../../queries/AssetPrice.hook";
import { USD_VALUE_DECIMALS } from "@meta";

export async function fetchAllUserRewardsByStrategy({
  user,
  strategy,
}: {
  user: Address;
  strategy: Address;
}): Promise<RewardsByStrategy> {
  const [rewardsAddresses, rewardsAmounts] = await queryContract({
    ...queryOptions({
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getAllUserRewards",
      args: [[strategy], user],
    }),
    ...metadataQueryConfig,
  });

  const rewardsInfo: RewardsByStrategyInfo[] = await Promise.all(
    rewardsAddresses.map(async (address, index) => {
      const tokenDataPromise = fetchTokenData(address);
      const tokenPricePromise = fetchAssetPriceInBlock(address);

      const { decimals, symbol } = await tokenDataPromise;
      const tokenPrice = await tokenPricePromise;

      return {
        rewardsAddress: address,
        rewardsAmount: rewardsAmounts[index],
        rewardsDecimals: decimals,
        rewardsSymbol: symbol,
        tokenPrice,
      };
    })
  );

  const totalRewards = calculateTotalRewards(rewardsInfo);

  return {
    info: rewardsInfo,
    totalRewards: {
      bigIntValue: totalRewards,
      decimals: USD_VALUE_DECIMALS,
      symbol: "$",
    },
  };
}
