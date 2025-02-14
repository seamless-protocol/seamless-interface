export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
}

export const cMaxUserDeposit = (maxDeposit?: FetchBigInt, assetBalance?: FetchBigInt): bigint | undefined => {
  // If both values are missing, return undefined
  if (maxDeposit?.bigIntValue == null && assetBalance?.bigIntValue == null) return undefined;
  if (maxDeposit?.bigIntValue == null) return assetBalance?.bigIntValue;
  if (assetBalance?.bigIntValue == null) return maxDeposit?.bigIntValue;

  if (maxDeposit.decimals == null || assetBalance.decimals == null) return undefined;
  if (maxDeposit.decimals !== assetBalance.decimals) throw new Error("cMaxUserDeposit: Decimals do not match");

  return maxDeposit?.bigIntValue! > assetBalance?.bigIntValue! ? assetBalance?.bigIntValue : maxDeposit?.bigIntValue;
};
