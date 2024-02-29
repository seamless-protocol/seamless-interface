export interface FetchNumber {
  value: number;
  symbol: string;
}

export interface FetchBigInt {
  bigIntValue: bigint;
  decimals: number;
  symbol: string;
}

export type Fetch<T> = T & {
  isFetched: boolean;
  isLoading: boolean;
};

export type FetchData<T> = {
  data: T;
  isFetched: boolean;
  isLoading: boolean;
};
