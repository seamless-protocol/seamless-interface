import { FetchBigInt, FetchNumber } from "../types/Fetch";

export const fFetchBigIntStructured = (bigIntValue?: bigint, decimals?: number, symbol?: string): FetchBigInt | undefined => {
  if (!decimals || !symbol) return undefined;

  return {
    bigIntValue,
    decimals,
    symbol
  }
}

export const fFetchNumberStructured = (value?: number, symbol?: string): FetchNumber | undefined => {
  if (!symbol) return undefined;

  return {
    value,
    symbol
  }
}

export const fUsdValueStructured = (bigIntValue?: bigint): FetchBigInt | undefined => {
  return {
    bigIntValue,
    symbol: "$",
    decimals: 8
  }
}

