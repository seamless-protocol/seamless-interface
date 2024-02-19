import { formatUnits } from "viem";
import { ONE_USD, SECONDS_PER_YEAR } from "../../app/meta/constants";
import { ViewBigInt, ViewNumber } from "../types/Displayable";
import { FetchBigInt, FetchNumber } from "../types/Fetch";

export interface DecimalsOptions {
  singleDigitNumberDecimals: number;
  doubleDigitNumberDecimals: number;
  threeDigitNumberDecimals: number;
  fourDigitNumberDecimals: number;
}

const defaultDecimalsOptions: DecimalsOptions = {
  singleDigitNumberDecimals: 2,
  doubleDigitNumberDecimals: 2,
  threeDigitNumberDecimals: 2,
  fourDigitNumberDecimals: 2,
};

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
  decimalsOptions: DecimalsOptions
) {
  if (!value) return format(0, 2);

  let decimals;
  if (value < 10) {
    decimals = decimalsOptions.singleDigitNumberDecimals;
  } else if (value < 100) {
    decimals = decimalsOptions.doubleDigitNumberDecimals;
  } else if (value < 1000) {
    decimals = decimalsOptions.threeDigitNumberDecimals;
  } else {
    decimals = decimalsOptions.fourDigitNumberDecimals;
  }

  return format(value, decimals);
}

/**
 * This function is used to format the number value to a displayable value or a placeholder, mostly used for APY and APR
 * @param value Value to format
 * @param placeholder Placeholder to display if value is undefined or 0
 * @param decimalsOptions Decimals options to use for formatting
 * @returns
 */
export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  decimalsOptions: DecimalsOptions = defaultDecimalsOptions
) {
  return value && value != 0
    ? formatToDisplayable(value, decimalsOptions)
    : placeholder;
}

/**
 * This function is used to format the bigInt value received from smart contracts to a displayable value
 * @param bigIntValue BigInt value to format
 * @param decimals On how many decimals bigint value is
 * @param symbol Symbol to display
 * @param decimalsOptions Decimals options to use for formatting
 * @returns
 */
export function formatFetchBigIntToViewBigInt(
  { bigIntValue, decimals, symbol = "" }: FetchBigInt,
  decimalsOptions: DecimalsOptions = defaultDecimalsOptions
): ViewBigInt {
  const value = formatUnitsToNumber(bigIntValue, decimals);
  return {
    value,
    viewValue: formatToDisplayable(value, decimalsOptions),
    bigIntValue: bigIntValue,
    symbol,
  };
}

/**
 * This function is used to format the number value to a displayable value
 * @param value Value to format
 * @param symbol Symbol to display
 * @param decimalsOptions Decimals options to use for formatting
 * @returns
 */
export function formatFetchNumberToViewNumber(
  { value, symbol }: FetchNumber,
  decimalsOptions: DecimalsOptions = defaultDecimalsOptions
): ViewNumber {
  return {
    value,
    viewValue: formatToDisplayable(value, decimalsOptions),
    symbol,
  };
}

export function convertRatioToMultiple(ratio: bigint | undefined = 0n) {
  return (ratio * ONE_USD) / (ratio - ONE_USD);
}

export function convertAprToApy(apr: number): number {
  return ((1 + apr / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1) * 100;
}
