export const cValueInUsd = (tokenAmount: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  const divider = 10n ** BigInt(tokenDecimals);
  if (divider === 0n) throw new Error("Invalid divider");

  return (tokenAmount * priceValue) / divider;
};
