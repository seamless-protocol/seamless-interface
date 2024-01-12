import { formatUnits } from "viem";

export function formatToNumber(
  value: string | bigint | undefined,
  decimals: number
) {
  return Number(formatUnits((value || 0) as bigint, decimals));
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
