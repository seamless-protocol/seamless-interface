import { ExtendedQueryState } from "../formatters/mergeQueryStates";

export interface FetchNumber {
  value?: number;
  symbol: string;
}

export interface FetchBigInt {
  bigIntValue?: bigint;
  decimals?: number;
  symbol?: string;
}

export type Fetch<T> = T & {
  isFetched: boolean;
  isLoading: boolean;
};

export interface FetchData<T> extends ExtendedQueryState<T> {
  data: T;
}
