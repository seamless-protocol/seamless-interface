export interface Displayable<T> {
  data: T;
  isFetched: boolean;
  isLoading: boolean;
}

export interface ViewValueSymbolPair {
  viewValue?: string | undefined;
  symbol?: string | undefined;
}

export interface ViewNumber extends ViewValueSymbolPair {
  value?: number | undefined;
}

export interface ViewBigInt extends ViewValueSymbolPair {
  value?: number | undefined;
  bigIntValue?: bigint | undefined;
}

export interface ValueSymbolPair {
  value?: string;
  symbol?: string;
  originalValue?: number;
}

export interface DisplayableAmount extends ViewValueSymbolPair {
  isFetched?: boolean;
  isLoading?: boolean;
}
