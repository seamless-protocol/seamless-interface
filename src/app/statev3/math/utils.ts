import { formatUnits, parseUnits } from "viem";

export const cValueInUsd = (tokenAmount: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (tokenAmount * priceValue) / 10n ** BigInt(tokenDecimals);
};

export const cValueFromUsd = (usdValue: bigint, priceValue: bigint, tokenDecimals: number): bigint => {
  return (usdValue * 10n ** BigInt(tokenDecimals)) / priceValue;
};

export const adjustDecimals = (value: bigint, fromDecimals: number, toDecimals: number): bigint => {
  if (fromDecimals === toDecimals) return value;

  const formatted = formatUnits(value, fromDecimals);
  return parseUnits(formatted, toDecimals);
};
