import { formatUnits } from "viem";
import { ONE_USD, SECONDS_PER_YEAR } from "../../app/meta/constants";
import { ViewBigInt, ViewNumber } from "../types/Displayable";
import { FetchBigInt, FetchNumber } from "../types/Fetch";

export function formatUnitsToNumber(
  value: string | bigint | undefined,
  decimals: number
) {
  return Number(formatUnits((value || 0) as bigint, decimals));
}

function format(value: number, decimals: number) {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

export function formatToDisplayable(
  value: number | undefined,
  extraDigitsCap = 1
) {
  value = value || 0;

  const decimals = value > 0 && value < extraDigitsCap ? 6 : 2;
  return format(value, decimals);
}

/**
 * This function is used to format the number value to a displayable value or a placeholder, mostly used for APY and APR
 * @param value Value to format
 * @param placeholder Placeholder to display if value is undefined or 0
 * @param extraDigitsCap If the value is less than this, display 6 decimals otherwise 2
 * @returns
 */
export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  extraDigitsCap = 1
) {
  return value && value != 0
    ? formatToDisplayable(value, extraDigitsCap)
    : placeholder;
}

/**
 * This function is used to format the bigInt value received from smart contracts to a displayable value
 * @param bigIntValue BigInt value to format
 * @param decimals On how many decimals bigint value is
 * @param symbol Symbol to display
 * @param extraDigitsCap If the value is less than this, display 6 decimals otherwise 2
 * @returns
 */
export function formatFetchBigIntToViewBigInt(
  { bigIntValue, decimals, symbol = "" }: FetchBigInt,
  extraDigitsCap = 1
): ViewBigInt {
  const value = formatUnitsToNumber(bigIntValue, decimals);
  return {
    value,
    viewValue: formatToDisplayable(value, extraDigitsCap),
    bigIntValue: bigIntValue,
    symbol,
  };
}

/**
 * This function is used to format the number value to a displayable value
 * @param value Value to format
 * @param symbol Symbol to display
 * @param extraDigitsCap If the value is less than this, display 6 decimals otherwise 2
 * @returns
 */
export function formatFetchNumberToViewNumber(
  { value, symbol }: FetchNumber,
  extraDigitsCap = 1
): ViewNumber {
  return {
    value,
    viewValue: formatToDisplayable(value, extraDigitsCap),
    symbol,
  };
}

export function convertRatioToMultiple(ratio: bigint | undefined = 0n) {
  return (ratio * ONE_USD) / (ratio - ONE_USD);
}

export function convertAprToApy(apr: number): number {
  return ((1 + apr / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1) * 100;
}
