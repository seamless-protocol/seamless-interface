import { Address, formatUnits } from "viem";
import { FetchBigIntStrict } from "@shared";
import { cValueInUsd } from "../../math/cValueInUsd";
import { USD_VALUE_DECIMALS } from "@meta";

export interface RewardsByStrategy {
  info: RewardsByStrategyInfo[];
  totalRewardsInUSD: number;
}

export interface RewardsByStrategyInfo {
  rewardsAddress: Address;
  rewardsAmount: bigint;
  rewardsDecimals: number;
  tokenPrice: FetchBigIntStrict;
}

export function calculateTotalRewards(info: RewardsByStrategyInfo[]): number {
  const result = info.reduce((total: number, item) => {
    const dollarValueBigInt = cValueInUsd(item.rewardsAmount, item.tokenPrice.bigIntValue, item.rewardsDecimals);

    const dollarValue = parseFloat(formatUnits(dollarValueBigInt, USD_VALUE_DECIMALS));
    return total + dollarValue;
  }, 0);

  return result;
}
