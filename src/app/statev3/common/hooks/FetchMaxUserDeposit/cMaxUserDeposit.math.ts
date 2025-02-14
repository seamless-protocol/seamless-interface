import { adjustDecimals } from "../../../math/utils";

export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
}

export const cMaxUserDeposit = (maxDeposit?: FetchBigInt, assetBalance?: FetchBigInt): bigint | undefined => {
  if (maxDeposit?.bigIntValue == null && assetBalance?.bigIntValue == null) return undefined;
  if (maxDeposit?.bigIntValue == null && assetBalance?.bigIntValue != null) return assetBalance.bigIntValue;
  if (maxDeposit?.bigIntValue != null && assetBalance?.bigIntValue == null) return maxDeposit.bigIntValue;

  if (!maxDeposit?.decimals) return undefined;
  if (!assetBalance?.decimals) return undefined;

  const maxDepositValue = maxDeposit?.bigIntValue as bigint;
  const assetBalanceValue = assetBalance?.bigIntValue as bigint;

  // adjust decimals of both values to higher one, for comparison
  const higherDecimalNumber = maxDeposit.decimals > assetBalance.decimals ? maxDeposit.decimals : assetBalance.decimals;
  const normalizedMaxDeposit = adjustDecimals(maxDepositValue, maxDeposit.decimals, higherDecimalNumber);
  const normalizedAssetBalance = adjustDecimals(assetBalanceValue, assetBalance.decimals, higherDecimalNumber);

  return normalizedMaxDeposit > normalizedAssetBalance ? assetBalanceValue : maxDepositValue;
};
