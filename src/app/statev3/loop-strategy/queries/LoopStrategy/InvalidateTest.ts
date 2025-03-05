import { isMatch } from "lodash";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";

type QueryOptions = { queryKey: any };

export function invalidateGenericQueries(queries: { [key: string]: QueryOptions }) {
  const queryClient = getQueryClient();
  // this could still have race condition issues, we would need to await here,
  Object.entries(queries).forEach(([_, queryKey]) => {
    queryClient.invalidateQueries({
      queryKey,
    });
  });

  // then await here
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
        console.log({ cachedQueryqq: cachedQuery.queryKey });
        console.log({ matcherKey });
        return cachedQuery.queryKey.some((element: any) => {
          return isMatch(element, matcherKey);
        });
      },
    });
  });
}
