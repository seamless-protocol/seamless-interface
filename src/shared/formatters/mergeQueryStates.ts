import { UseQueryResult, QueryKey } from "@tanstack/react-query";

export type ExtendedQueryState<TData> = Pick<UseQueryResult<TData>, 'isLoading' | 'isError' | 'isFetched' | 'isSuccess'> & {
  queryKeys?: QueryKey[];
  queryKey?: QueryKey;
};

export function mergeQueryStates<TData>(queryStates: ExtendedQueryState<TData>[]): ExtendedQueryState<TData> {
  const defaultState: ExtendedQueryState<TData> = {
    isLoading: false,
    isError: false,
    isFetched: true,
    isSuccess: false,
    queryKeys: [],
  };

  return queryStates.reduce<ExtendedQueryState<TData>>((accumulator, current) => {
    let combinedQueryKeys = accumulator.queryKeys || [];
    if (current.queryKey) {
      combinedQueryKeys.push(current.queryKey);
    }
    if (current.queryKeys) {
      combinedQueryKeys = combinedQueryKeys.concat(current.queryKeys);
    }

    return {
      isLoading: accumulator.isLoading || current.isLoading,
      isError: accumulator.isError || current.isError,
      isFetched: accumulator.isFetched && current.isFetched,
      isSuccess: accumulator.isSuccess && current.isSuccess,
      queryKeys: combinedQueryKeys,
    };
  }, defaultState);
}
