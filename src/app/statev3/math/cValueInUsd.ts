export const cValueInUsd = (tokenAmount: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (tokenAmount * priceValue) / 10n ** BigInt(tokenDecimals);
};
