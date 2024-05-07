import { FetchBigInt, FetchNumber } from "../types/Fetch";

export const fFetchBigIntStructured = (
  bigIntValue?: bigint,
  decimals?: number,
  symbol?: string
): FetchBigInt | undefined => {
  // todo rethink this?
  // if (decimals == null) return undefined;

  return {
    bigIntValue,
    decimals,
    symbol,
  };
};

export const fFetchNumberStructured = (value?: number, symbol?: string): FetchNumber | undefined => {
  return {
    value,
    symbol,
  };
};

export const fUsdValueStructured = (bigIntValue?: bigint, decimals = 8, symbol = "$"): FetchBigInt | undefined => {
  return {
    bigIntValue,
    symbol,
    decimals,
  };
};
