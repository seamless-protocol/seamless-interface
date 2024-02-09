export interface Displayable<T> {
  data?: T;
  isFetched?: boolean;
  isLoading?: boolean;
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
