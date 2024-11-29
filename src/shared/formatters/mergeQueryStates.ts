import { UseQueryResult, QueryKey } from "@tanstack/react-query";

export type ExtendedQueryState<TData> = Pick<UseQueryResult<TData>, "isLoading" | "isFetched"> & {
  queryKeys?: QueryKey[];
  queryKey?: QueryKey;
  isError?: boolean;
  isSuccess?: boolean;
  error?: unknown;
};

export function mergeQueryStates<TData>(queryStates: ExtendedQueryState<TData>[]): ExtendedQueryState<TData> {
  return queryStates.reduce<ExtendedQueryState<TData>>(
    (accumulator, current) => {
      return {
        isLoading: accumulator.isLoading || current.isLoading, // true if any is loading
        isError: accumulator.isError || current.isError, // true if any has error
        isFetched: accumulator.isFetched && current.isFetched, // true if all are fetched
        isSuccess: accumulator.isSuccess && current.isSuccess, // true if all are successful
        error: accumulator.error || current.error,
        queryKeys: [
          ...(accumulator.queryKeys || []),
          ...(current.queryKeys || []),
          ...(current.queryKey ? [current.queryKey] : []),
        ],
      };
    },
    {
      isLoading: false,
      isError: false,
      isFetched: true,
      isSuccess: true,
      error: undefined,
      queryKeys: [],
    }
  );
}
