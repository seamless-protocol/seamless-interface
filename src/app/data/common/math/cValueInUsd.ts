export const cValueInUsd = (tokenAmount?: bigint, priceValue?: bigint, tokenDecimals?: number) => {
  if (tokenAmount == null || priceValue == null || tokenDecimals == null) return undefined;

  const divider = 10n ** BigInt(tokenDecimals);
  if (divider === 0n) return undefined;

  return (tokenAmount * priceValue) / divider;
};

export const cValueFromUsd = (usdValue?: bigint, priceValue?: bigint, tokenDecimals?: number) => {
  if (usdValue == null || priceValue == null || tokenDecimals == null) return undefined;

  const divider = 10n ** BigInt(tokenDecimals);
  if (divider === 0n) return undefined;

  return (usdValue * divider) / priceValue;
};
