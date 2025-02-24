export const cRemainingCapPercentage = (assetCap?: bigint, equity?: bigint, decimals?: number): bigint | undefined => {
  if (assetCap == null || equity == null || decimals == null) return undefined;

  const remainingCap = assetCap - equity;

  const divider = assetCap;
  if (divider === 0n) return undefined;

  const remainingCapPercentage = (remainingCap * 100n * 10n ** BigInt(decimals)) / divider;
  return remainingCapPercentage;
};

export const cRemainingCap = (assetCap?: bigint, equity?: bigint) => {
  if (equity == null || assetCap == null) return undefined;
  return assetCap - equity;
};
