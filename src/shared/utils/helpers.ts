import { Address, formatUnits } from "viem";
import { INFINITE_HEALTH_FACTOR_BORDER, ONE_USD, SECONDS_PER_YEAR } from "../../meta/constants";
import { ViewBigInt, ViewNumber } from "../types/Displayable";
import { FetchBigInt, FetchBigIntStrict, FetchNumber } from "../types/Fetch";

export const UNDEFINED_VIEW_VALUE = "/";
export const UNDEFINED_VIEW_SYMBOL = "/";

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

export interface FormattingOptions {
  disableCompact?: boolean;
  roundDown?: boolean;
}

export function formatUnitsToNumber(value: string | bigint | undefined, decimals: number) {
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
function formatFull(value: number, decimals: number) {
  const formatter = Intl.NumberFormat("en", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

  return formatter.format(value);
}

export function formatToDisplayable(
  value: number | undefined,
  decimalsOptions?: Partial<DecimalsOptions>,
  options?: FormattingOptions
) {
  if (!value) return format(0, 2);

  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };

  let decimals;
  if (value < 10) {
    decimals = decimalsFormattingOptions.singleDigitNumberDecimals;
  } else if (value < 99.5) {
    decimals = decimalsFormattingOptions.doubleDigitNumberDecimals;
  } else if (value < 1000) {
    decimals = decimalsFormattingOptions.threeDigitNumberDecimals;
  } else {
    decimals = decimalsFormattingOptions.fourDigitNumberDecimals;
  }

  const valueToFormat = options?.roundDown ? Math.floor(value * 10 ** decimals) / 10 ** decimals : value;

  if (options?.disableCompact) return formatFull(valueToFormat, decimals);

  return format(valueToFormat, decimals);
}

/**
 * This function is used to format the number value to a displayable value or a placeholder, mostly used for APY and APR
 * @param value Value to format
 * @param placeholder Placeholder to display if value is undefined or 0
 * @param decimalsOptions Decimals options to use for formatting, partial type of DecimalsOptions. If some fields are not provided default values will be used
 * @returns
 */
export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  decimalsOptions?: Partial<DecimalsOptions>
) {
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  return value && value !== 0 ? formatToDisplayable(value, decimalsFormattingOptions) : placeholder;
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
  data?: FetchBigInt | FetchBigIntStrict,
  decimalsOptions?: Partial<DecimalsOptions>,
  options?: FormattingOptions
): ViewBigInt {
  if (data === undefined) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue: undefined,
      symbol: UNDEFINED_VIEW_SYMBOL,
    };
  }

  const { bigIntValue, decimals, symbol } = data;
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  const value = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;

  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(value, decimalsFormattingOptions, options),
    bigIntValue,
    symbol,
    decimals,
  };
}

// This is temporary copy of formatFetchBigIntToViewBigInt that can return undefined, over time this one should be used on all places and renamed
export function formatFetchBigIntToViewBigIntTemp(
  data: FetchBigInt | undefined,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewBigInt | undefined {
  if (!data) return undefined;

  const { bigIntValue, decimals, symbol = "" } = data;
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  const value = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;

  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(value, decimalsFormattingOptions),
    bigIntValue,
    symbol,
  };
}

/**
 * This function is used to format the number value to a displayable value
 * @param value Value to format
 * @param symbol Symbol to display
 * @param decimalsOptions Decimals options to use for formatting, partial type of DecimalsOptions. If some fields are not provided default values will be used
 * @returns
 */
export function formatFetchNumberToViewNumber(
  fetchNumber?: FetchNumber,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewNumber {
  if (!fetchNumber)
    return {
      value: undefined,
      viewValue: "/",
      symbol: "/",
    };

  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  return {
    value: fetchNumber.value,
    viewValue: formatToDisplayable(fetchNumber.value, decimalsFormattingOptions),
    symbol: fetchNumber.symbol,
  };
}

export function formatFetchBigIntToHealthFactor(
  data: FetchBigInt,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewBigInt {
  const { bigIntValue, decimals, symbol = "" } = data;
  const decimalsFormattingOptions = {
    ...defaultDecimalsOptions,
    ...decimalsOptions,
  };
  if (bigIntValue === undefined) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue,
      symbol,
    };
  }

  // Multiply by 100 and divide by 100 to round down on 2 decimals
  const value = decimals ? Math.floor(formatUnitsToNumber(bigIntValue, decimals) * 100) / 100 : undefined;

  return {
    value: decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue:
      bigIntValue < INFINITE_HEALTH_FACTOR_BORDER ? formatToDisplayable(value, decimalsFormattingOptions) : "∞",
    bigIntValue,
    symbol,
  };
}

export function formatIncentiveAprToViewNumber(apr?: number | undefined): ViewNumber {
  return {
    viewValue: formatToDisplayableOrPlaceholder(apr || 0, ""),
    symbol: (apr || 0) > 0 ? "%" : "",
  };
}

export function convertRatioToMultiple(ratio: bigint | undefined = 0n) {
  return (ratio * ONE_USD) / (ratio - ONE_USD);
}

export function convertAprToApy(apr: number): number {
  return ((1 + apr / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1) * 100;
}

export function normalizeDecimals(value: bigint, valueDecimals: bigint, toDecimals: bigint): bigint {
  if (valueDecimals <= toDecimals) {
    return value * 10n ** (toDecimals - valueDecimals);
  }
  return value / 10n ** (valueDecimals - toDecimals);
}

export function formatAddressToDisplayable(address?: Address): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}