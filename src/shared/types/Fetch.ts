export interface FetchNumber {
  value: number;
  symbol: string;
}

export interface FetchBigInt {
  bigIntValue: bigint;
  symbol: string;
  decimals: number;
}

export type Fetch<T> = T & {
  isFetched: boolean;
  isLoading: boolean;
};
