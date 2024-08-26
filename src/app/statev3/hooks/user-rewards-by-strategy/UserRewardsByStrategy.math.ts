export interface RewardsByStrategyInfo {
  dollarAmount: bigint;
}

export function cTotalRewards(info: RewardsByStrategyInfo[]): bigint {
  const result = info.reduce((total: bigint, item) => {
    return total + item.dollarAmount;
  }, 0n);

  return result;
}
