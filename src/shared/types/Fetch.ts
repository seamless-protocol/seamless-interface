import { ExtendedQueryState } from "../formatters/mergeQueryStates";

export interface FetchNumber {
  value?: number;
  symbol?: string;
}

export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
  symbol?: string;
}

export interface FetchTokenAmountWithUsdValue {
  tokenAmount?: FetchBigInt;
  dollarAmount?: FetchBigInt;
}

export type Fetch<T> = T & {
  isFetched: boolean;
  isLoading: boolean;
};

export interface FetchData<T> extends ExtendedQueryState<T> {
  data: T;
}

export const buildSuccessfulFetch = <T>(data: T): FetchData<T> => ({
  data,
  isLoading: false,
  isError: false,
  isSuccess: true,
  isFetched: true,
  queryKeys: [],
});

// TODO: Rename to FetchBigInt when old one is deleted
export interface FetchBigIntStrict {
  bigIntValue: bigint;
  decimals: number;
  symbol: string;
}

// TODO: Rename to FetchTokenAmountWithUsdValue when old one is deleted
export interface FetchTokenAmountWithUsdValueStrict {
  tokenAmount: FetchBigIntStrict;
  dollarAmount: FetchBigIntStrict;
}
