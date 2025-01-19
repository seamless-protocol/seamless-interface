import { ExtendedQueryState } from "../formatters/mergeQueryStates";

export interface Displayable<T> extends ExtendedQueryState<T> {
  data: T;
}

export interface ViewValueSymbolPair {
  viewValue?: string | undefined;
  symbol?: string | undefined;
}

export interface ViewNumber extends ViewValueSymbolPair {
  value?: number | undefined;
}

export interface ViewBigInt extends ViewValueSymbolPair {
  value?: string | undefined;
  decimals?: number | undefined;
  bigIntValue?: bigint | undefined;
}

// todo: should this extend ViewValueSymbolPair ?
export interface ViewBigIntWithUsdValue extends ViewValueSymbolPair {
  tokenAmount: ViewBigInt;
  dollarAmount: ViewBigInt;
}

export interface ValueSymbolPair {
  value?: string;
  symbol?: string;
  originalValue?: number;
}

export interface DisplayableAmount extends ViewValueSymbolPair {
  isFetched?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
