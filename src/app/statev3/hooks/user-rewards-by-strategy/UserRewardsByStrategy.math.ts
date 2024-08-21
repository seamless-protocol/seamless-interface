import { Address } from "viem";
import { FetchBigInt, FetchBigIntStrict } from "@shared";
import { cValueInUsd } from "../../math/cValueInUsd";

export interface RewardsByStrategy {
  info: RewardsByStrategyInfo[];
  totalRewards: FetchBigInt;
}

export interface RewardsByStrategyInfo {
  rewardsAddress: Address;
  rewardsAmount: bigint;
  rewardsDecimals: number;
  rewardsSymbol?: string;
  tokenPrice: FetchBigIntStrict;
}

export function calculateTotalRewards(info: RewardsByStrategyInfo[]): bigint {
  const result = info.reduce((total: bigint, item) => {
    const valueInUsd = cValueInUsd(item.rewardsAmount, item.tokenPrice.bigIntValue, item.rewardsDecimals);

    return valueInUsd ? total + valueInUsd : total;
  }, 0n);

  return result;
}
