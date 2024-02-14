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

export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  extraDigitsCap = 1
) {
  return value && value != 0
    ? formatToDisplayable(value, extraDigitsCap)
    : placeholder;
}

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
