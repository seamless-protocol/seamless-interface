// file: format-utils.ts
import { Address, formatUnits } from "viem";
import { INFINITE_HEALTH_FACTOR_BORDER, ONE_USD, SECONDS_PER_YEAR } from "../../meta/constants";
import { ViewBigInt, ViewNumber } from "../types/Displayable";
import { FetchBigInt, FetchBigIntStrict, FetchNumber } from "../types/Fetch";

// Placeholder constants
export const UNDEFINED_VIEW_VALUE = "/";
export const UNDEFINED_VIEW_SYMBOL = "/";

/**
 * Configuration for decimal precision based on value magnitude
 */
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

/**
 * Options to tweak formatting behavior
 */
export interface FormattingOptions {
  disableCompact?: boolean; // force standard notation
  roundDown?: boolean; // floor rounding on compact
}

/**
 * Convert raw bigint/string to JS number via viem.formatUnits
 */
export function formatUnitsToNumber(value: string | bigint | undefined, decimals: number): number {
  return Number(formatUnits((value ?? 0) as bigint, decimals));
}

/**
 * Internal: format a JS number with Intl.NumberFormat
 */
function formatValue(value: number, minDecimals: number, maxDecimals: number, compact: boolean): string {
  const formatter = new Intl.NumberFormat("en", {
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
    useGrouping: !compact,
  });
  return formatter.format(value);
}

/**
 * Primary entry point: formats a number into compact or standard display,
 * always showing at least 2 decimals and trimming trailing zeros beyond that.
 */
export function formatToDisplayable(
  value: number | undefined,
  decimalsOptions?: Partial<DecimalsOptions>,
  options?: FormattingOptions
): string {
  if (value === undefined || Number.isNaN(value)) {
    // fallback: show 0.00
    return formatValue(0, 2, 2, false);
  }
  // explicitly show "0.00" for zero
  if (value === 0) {
    return formatValue(0, 2, 2, false);
  }

  const opts = { ...defaultDecimalsOptions, ...decimalsOptions };
  let baseDecimals: number;

  if (value < 1) {
    baseDecimals = opts.lessThanOneNumberDecimals;
  } else if (value < 10) {
    baseDecimals = opts.singleDigitNumberDecimals;
  } else if (value < 100) {
    baseDecimals = opts.doubleDigitNumberDecimals;
  } else if (value < 1000) {
    baseDecimals = opts.threeDigitNumberDecimals;
  } else {
    baseDecimals = opts.fourDigitNumberDecimals;
  }

  const isInteger = value % 1 === 0;
  const minDecimals = 2;
  const maxDecimals = isInteger ? minDecimals : baseDecimals;

  const isSmall = value < 1;
  const compact = !options?.disableCompact && !isSmall;

  let toFormat = value;
  if (compact && options?.roundDown) {
    const factor = 10 ** maxDecimals;
    toFormat = Math.floor(value * factor) / factor;
  }

  return formatValue(toFormat, minDecimals, maxDecimals, compact);
}

/**
 * Fallback placeholder wrapper
 */
export function formatToDisplayableOrPlaceholder(
  value: number | undefined,
  placeholder: string,
  decimalsOptions?: Partial<DecimalsOptions>
): string {
  return value !== undefined && value !== 0 ? formatToDisplayable(value, decimalsOptions) : placeholder;
}

/**
 * Format on-chain BigInt to ViewBigInt
 */
export function formatFetchBigIntToViewBigInt(
  data?: FetchBigInt | FetchBigIntStrict,
  decimalsOptions?: Partial<DecimalsOptions>,
  options?: FormattingOptions
): ViewBigInt {
  if (!data) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      bigIntValue: undefined,
      symbol: UNDEFINED_VIEW_SYMBOL,
    };
  }

  const { bigIntValue, decimals, symbol } = data;
  const numeric = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;
  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(numeric, decimalsOptions, options),
    bigIntValue,
    symbol,
    decimals,
  };
}

/**
 * Temporary variant returning undefined
 */
export function formatFetchBigIntToViewBigIntTemp(data: FetchBigInt | undefined): ViewBigInt | undefined {
  if (!data) return undefined;

  const { bigIntValue, decimals, symbol = "" } = data;
  const numeric = decimals ? formatUnitsToNumber(bigIntValue, decimals) : undefined;
  return {
    value: bigIntValue && decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue: formatToDisplayable(numeric, defaultDecimalsOptions),
    bigIntValue,
    symbol,
  };
}

/**
 * Format FetchNumber to ViewNumber
 */
export function formatFetchNumberToViewNumber(
  fetchNumber?: FetchNumber,
  decimalsOptions?: Partial<DecimalsOptions>
): ViewNumber {
  if (!fetchNumber) {
    return {
      value: undefined,
      viewValue: UNDEFINED_VIEW_VALUE,
      symbol: UNDEFINED_VIEW_SYMBOL,
    };
  }
  return {
    value: fetchNumber.value,
    viewValue: formatToDisplayable(fetchNumber.value, decimalsOptions),
    symbol: fetchNumber.symbol,
  };
}

/**
 * Health factor formatting
 */
export function formatFetchBigIntToHealthFactor(data: FetchBigInt): ViewBigInt {
  const { bigIntValue, decimals, symbol = "" } = data;
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
  const viewValue = bigIntValue < INFINITE_HEALTH_FACTOR_BORDER ? formatToDisplayable(numeric) : "∞";

  return {
    value: decimals ? formatUnits(bigIntValue, decimals) : undefined,
    viewValue,
    bigIntValue,
    symbol,
  };
}

/**
 * Incentive APR formatting
 */
export function formatIncentiveAprToViewNumber(apr: number = 0): ViewNumber {
  return {
    viewValue: formatToDisplayableOrPlaceholder(apr, ""),
    symbol: apr > 0 ? "%" : "",
  };
}

/**
 * Additional utilities
 */
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
