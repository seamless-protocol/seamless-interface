export const cValueInUsd = (tokenAmount: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (tokenAmount * priceValue) / 10n ** BigInt(tokenDecimals);
};

export const cValueFromUsd = (usdValue: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (usdValue * 10n ** BigInt(tokenDecimals)) / priceValue;
};

// The precision of the slippage percentage is 100000 = 100%. e.g. 1 = 0.001%
export const cValueWithSlippage = (tokenAmount: bigint, slippage: number): bigint => {
  return (tokenAmount * BigInt(100000 - slippage)) / BigInt(100000);
};