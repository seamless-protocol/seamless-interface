import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";

type QueryOptions = { queryKey: any };

export function invalidateGenericQueries(queries: { [key: string]: QueryOptions }) {
  const queryClient = getQueryClient();
  Object.entries(queries).forEach(([_, queryKey]) => {
    queryClient.invalidateQueries({
      queryKey,
    });
  });

  Object.entries(queries).forEach(([wrapperKey, queryKey]) => {
    queryClient.invalidateQueries({
      queryKey: [{ [wrapperKey]: queryKey }],
    });
  });
}

export function invalidateGenericQueriesArray(queries: any[]) {
  const queryClient = getQueryClient();
  queries.forEach((matcherKey) => {
    queryClient.invalidateQueries({
      predicate: (cachedQuery) => {
        return cachedQuery.queryKey.some((element: any) => {
          return JSON.stringify(element) === JSON.stringify(matcherKey);
        });
      },
    });
  });
}
