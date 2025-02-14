import { adjustDecimals } from "../../../math/utils";

export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
}

export const cMaxUserDeposit = (maxDeposit?: FetchBigInt, assetBalance?: FetchBigInt): FetchBigInt | undefined => {
  // If both values are missing, return undefined
  if (maxDeposit?.bigIntValue == null && assetBalance?.bigIntValue == null) return undefined;
  if (maxDeposit?.bigIntValue == null) return assetBalance;
  if (assetBalance?.bigIntValue == null) return maxDeposit;

  // Ensure both have defined decimals
  if (maxDeposit.decimals == null || assetBalance.decimals == null) return undefined;

  // Determine the highest decimals to use for a fair comparison
  const higherDecimals = Math.max(maxDeposit.decimals, assetBalance.decimals);

  // Normalize both values
  const normalizedMaxDeposit = adjustDecimals(maxDeposit.bigIntValue, maxDeposit.decimals, higherDecimals);
  const normalizedAssetBalance = adjustDecimals(assetBalance.bigIntValue, assetBalance.decimals, higherDecimals);

  return normalizedMaxDeposit > normalizedAssetBalance ? assetBalance : maxDeposit;
};
