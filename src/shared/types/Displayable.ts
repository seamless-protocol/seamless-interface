export interface Displayable<T> {
  data?: T;
  isFetched?: boolean;
  isLoading?: boolean;
}

export interface ViewValueSymbolPair {
  viewValue: string;
  symbol: string;
}

export interface ViewNumber extends ViewValueSymbolPair {
  value: number;
}

export interface ViewBigInt extends ViewValueSymbolPair {
  bigIntValue: bigint;
}

export interface ValueSymbolPair {
  value?: string;
  symbol?: string;
  originalValue?: number;
}

export interface DisplayableAmount extends ValueSymbolPair {
  isFetched?: boolean;
  isLoading?: boolean;
}
