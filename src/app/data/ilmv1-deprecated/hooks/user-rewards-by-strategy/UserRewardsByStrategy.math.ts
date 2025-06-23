import { FetchBigIntStrict } from "../../../../../shared";

export interface RewardsByStrategyInfo {
  dollarAmount: FetchBigIntStrict;
}

export function cTotalRewards(info: RewardsByStrategyInfo[]): bigint {
  const result = info.reduce((total: bigint, item) => {
    return total + item.dollarAmount.bigIntValue;
  }, 0n);

  return result;
}
