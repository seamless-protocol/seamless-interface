import { Address, formatUnits } from "viem";
import { FetchBigIntStrict } from "@shared";
import { cValueInUsd } from "../../math/cValueInUsd";
import { USD_VALUE_DECIMALS } from "@meta";

export interface RewardsByStrategy {
  info: RewardsByStrategyInfo[];
  totalRewardsInUSD: bigint;
}

export interface RewardsByStrategyInfo {
  rewardsAddress: Address;
  rewardsAmount: bigint;
  rewardsDecimals: number;
  tokenPrice: FetchBigIntStrict;
}

export function calculateTotalRewards(info: RewardsByStrategyInfo[]): number {
  const result = info.reduce((total: bigint, item) => {
    const valueInUsd = cValueInUsd(item.rewardsAmount, item.tokenPrice.bigIntValue, item.rewardsDecimals);

    return total + valueInUsd;
  }, 0);

  return result;
}
