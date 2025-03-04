import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";

type QueryOptions = { queryKey: any };

export function invalidateGenericQueries(queries: { [key: string]: QueryOptions }) {
  const queryClient = getQueryClient();

  Object.entries(queries).forEach(([wrapperKey, queryOptions]) => {
    // Invalidate using a wrapped key
    queryClient.invalidateQueries({
      queryKey: [{ [wrapperKey]: queryOptions.queryKey }],
    });

    queryClient.invalidateQueries({
      queryKey: queryOptions.queryKey,
    });
  });
}
