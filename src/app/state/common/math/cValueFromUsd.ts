export const cValueFromUsd = (usdAmount?: bigint, priceValue?: bigint, tokenDecimals?: number) => {
  if (usdAmount == null || priceValue == null || tokenDecimals == null) return undefined;

  const multiplier = 10n ** BigInt(tokenDecimals);

  return (usdAmount * multiplier) / priceValue;
};
