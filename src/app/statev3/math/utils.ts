export const cValueInUsd = (tokenAmount: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (tokenAmount * priceValue) / 10n ** BigInt(tokenDecimals);
};

export const cValueFromUsd = (usdValue: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (usdValue * 10n ** BigInt(tokenDecimals)) / priceValue;
};
