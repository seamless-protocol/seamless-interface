import { formatUnits } from "viem";

export function formatToNumber(
  value: string | bigint | undefined,
  decimals: number
) {
  return Number(formatUnits((value || 0) as bigint, decimals));
}

export function formatOnTwoDecimals(
  input: string | number | undefined
): string {
  if (!input) {
    return "0.00";
  }

  const parsedNumber = parseFloat(input.toString());

  if (parsedNumber >= 1000000) {
    return (parsedNumber / 1000000).toFixed(2) + "M";
  } else if (parsedNumber >= 1000) {
    return (parsedNumber / 1000).toFixed(2) + "K";
  } else {
    return parsedNumber.toFixed(2);
  }
}
