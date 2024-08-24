import { FetchBigIntStrict } from "@shared";
import { cValueInUsd } from "../../math/cValueInUsd";

export interface RewardsByStrategyInfo {
  rewardsAmount: bigint;
  rewardsDecimals: number;
  tokenPrice: FetchBigIntStrict;
}

export function cTotalRewards(info: RewardsByStrategyInfo[]): bigint {
  const result = info.reduce((total: bigint, item) => {
    const valueInUsd = cValueInUsd(item.rewardsAmount, item.tokenPrice.bigIntValue, item.rewardsDecimals);

    return total + valueInUsd;
  }, 0n);

  return result;
}
