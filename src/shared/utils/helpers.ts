import { Address, formatUnits } from "viem";
import { format as d3Format } from "d3-format";
import { INFINITE_HEALTH_FACTOR_BORDER, ONE_USD, SECONDS_PER_YEAR } from "../../meta/constants";
import { ViewBigInt, ViewNumber } from "../types/Displayable";
import { FetchBigInt, FetchBigIntStrict, FetchNumber } from "../types/Fetch";

// Placeholder constants
export const UNDEFINED_VIEW_VALUE = "/";
export const UNDEFINED_VIEW_SYMBOL = "/";

export interface DecimalsOptions {
  /** Values < 1 (e.g. 0.123456) */
  lessThanOneNumberDecimals: number;
  /** Values [1,10) */
  singleDigitNumberDecimals: number;
  /** Values [10,100) */
  doubleDigitNumberDecimals: number;
  /** Values [100,1000) */
  threeDigitNumberDecimals: number;
  /** Values >= 1000 */
  fourDigitNumberDecimals: number;
}

const defaultDecimalsOptions: DecimalsOptions = {
  lessThanOneNumberDecimals: 5,
  singleDigitNumberDecimals: 4,
  doubleDigitNumberDecimals: 3,
  threeDigitNumberDecimals: 3,
  fourDigitNumberDecimals: 3,
};

export interface FormattingOptions {
  disableCompact?: boolean;
  /** Round down (floor) instead of default half-up */
  roundDown?: boolean;
}

/**
 * Convert a raw bigint (or string) to a JS number using viem.formatUnits
 */
export function formatUnitsToNumber(value: string | bigint | undefined, decimals: number): number {
  return Number(formatUnits((value ?? 0) as bigint, decimals));
}

/**
 * Core formatter: uses d3-format for compact (SI) or full notation.
 */
function formatValue(value: number, decimals: number, compact: boolean): string {
  // compact: .{decimals}~s e.g. 1.23k (but disabled for small values)
  // full:    ,.{decimals}~f e.g. 1,234.56 or 0.000123
  const specifier = compact ? `.${decimals}~s` : `,.${decimals}~f`;
  return d3Format(specifier)(value);
}

/**
 * Choose number of decimals based on magnitude and format with half-up rounding on compact
 */
export function formatToDisplayable(
  value: number | undefined,
  decimalsOptions?: Partial<DecimalsOptions>,
  options?: FormattingOptions
): string {
  // undefined or NaN => show zero compact
  if (value === undefined || Number.isNaN(value)) {
    return formatValue(0, 2, true);
  }

  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };
  let decimals: number;

  if (value < 1) {
    decimals = opts.lessThanOneNumberDecimals;
  } else if (value < 10) {
    decimals = opts.singleDigitNumberDecimals;
  } else if (value < 100) {
    decimals = opts.doubleDigitNumberDecimals;
  } else if (value < 1000) {
    decimals = opts.threeDigitNumberDecimals;
  } else {
    decimals = opts.fourDigitNumberDecimals;
  }

  // small values (<1) always full format
  const isSmall = value < 1;
  const compact = !options?.disableCompact && !isSmall;

  // apply rounding strategy on compact only
  let toFormat = value;
  if (compact) {
    const factor = 10 ** decimals;
    toFormat = options?.roundDown ? Math.floor(value * factor) / factor : Math.round(value * factor) / factor;
  }

  return formatValue(toFormat, decimals, compact);
}

/**
 * Format number or show placeholder if zero/undefined
 */
export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  decimalsOptions?: Partial<DecimalsOptions>
): string {
  return value && value !== 0 ? formatToDisplayable(value, decimalsOptions) : placeholder;
}

/**
 * Format on-chain bigint values into ViewBigInt
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
  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };
  const numeric = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;

  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(numeric, opts, options),
    bigIntValue,
    symbol,
    decimals,
  };
}

/**
 * Temporary variant that can return undefined
 */
export function formatFetchBigIntToViewBigIntTemp(
  data: FetchBigInt | undefined,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewBigInt | undefined {
  if (!data) return undefined;

  const { bigIntValue, decimals, symbol = "" } = data;
  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };
  const numeric = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;

  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(numeric, opts),
    bigIntValue,
    symbol,
  };
}

/**
 * Format simple FetchNumber to ViewNumber
 */
export function formatFetchNumberToViewNumber(
  fetchNumber?: FetchNumber,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewNumber {
  if (!fetchNumber) {
    return { value: undefined, viewValue: UNDEFINED_VIEW_VALUE, symbol: UNDEFINED_VIEW_SYMBOL };
  }

  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };
  return {
    value: fetchNumber.value,
    viewValue: formatToDisplayable(fetchNumber.value, opts),
    symbol: fetchNumber.symbol,
  };
}

/**
 * Health factor gets special "∞" when above border
 */
export function formatFetchBigIntToHealthFactor(
  data: FetchBigInt,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewBigInt {
  const { bigIntValue, decimals, symbol = "" } = data;
  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };

  if (bigIntValue === undefined) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue,
      symbol,
    };
  }

  const raw = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;
  const numeric = raw !== undefined ? Math.floor(raw * 100) / 100 : undefined;

  const viewValue = bigIntValue < INFINITE_HEALTH_FACTOR_BORDER ? formatToDisplayable(numeric, opts) : "∞";

  return {
    value: decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue,
    bigIntValue,
    symbol,
  };
}

/**
 * % APR formatting
 */
export function formatIncentiveAprToViewNumber(apr?: number): ViewNumber {
  const val = apr || 0;
  return {
    viewValue: formatToDisplayableOrPlaceholder(val, ""),
    symbol: val > 0 ? "%" : "",
  };
}

export function convertRatioToMultiple(ratio: bigint | undefined = 0n): bigint {
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
