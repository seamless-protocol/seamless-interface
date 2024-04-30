import { FetchBigInt } from "../types/Fetch";

export const getFetchBigIntStructured = (bigIntValue?: bigint, decimals?: number, symbol?: string): FetchBigInt | undefined => {
  if (!decimals || !symbol) return undefined;

  return {
    bigIntValue,
    decimals,
    symbol
  }
}
