import { isMatch } from "lodash";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";

type QueryOptions = { queryKey: any };

export async function invalidateGenericQueries(queries: { [key: string]: QueryOptions }) {
  const queryClient = getQueryClient();
  const promises: any[] = [];

  // Invalidate child queries
  Object.entries(queries).forEach(([_, queryKey]) => {
    promises.push(queryClient.invalidateQueries({ queryKey }));
  });

  // Invalidate parent queries
  Object.entries(queries).forEach(([wrapperKey, queryKey]) => {
    promises.push(
      queryClient.invalidateQueries({
        queryKey: [{ [wrapperKey]: queryKey }],
      })
    );
  });

  // Wait for all invalidations to finish
  await Promise.all(promises);
}

export async function invalidateGenericQueriesArray(queries: any[]) {
  const queryClient = getQueryClient();
  const promises = queries.map((matcherKey) =>
    queryClient.invalidateQueries({
      predicate: (cachedQuery) => {
        console.log({ cachedQueryqq: cachedQuery.queryKey });
        console.log({ matcherKey });
        // first invalidate parent and then child
        return cachedQuery.queryKey.some((element: any) => isMatch(element, matcherKey));
      },
    })
  );
  await Promise.all(promises);
}
