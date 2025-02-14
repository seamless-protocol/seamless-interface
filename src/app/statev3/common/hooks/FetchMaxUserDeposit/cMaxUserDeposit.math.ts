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

  // adjust decimals of both values to 18
  const adjustDecimalsNumber = 18;
  const normalizedMaxDeposit = adjustDecimals(maxDepositValue, maxDeposit.decimals, adjustDecimalsNumber);
  const normalizedAssetBalance = adjustDecimals(assetBalanceValue, assetBalance.decimals, adjustDecimalsNumber);

  return normalizedMaxDeposit > normalizedAssetBalance ? normalizedAssetBalance : normalizedMaxDeposit;
};
