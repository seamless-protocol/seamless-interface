import { formatUnits } from "viem";
import { ONE_USD } from "./constants";

export function formatToNumber(
  value: string | bigint | undefined,
  decimals: number
) {
  return Number(formatUnits((value || 0) as bigint, decimals));
}

export function stringToNumber(value: string | undefined) {
  return parseFloat(value || "0");
}

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatOnTwoDecimals(
  input: number | bigint | undefined
): string {
  return formatter.format(input || 0);
}

export function formatBigIntOnTwoDecimals(
  input: bigint | undefined,
  decimals: number
): string {
  return formatter.format(formatToNumber(input, decimals));
}

export function convertRatioToMultiple(ratio: bigint | undefined = 0n) {
  return (ratio * ONE_USD) / (ratio - ONE_USD);
}
