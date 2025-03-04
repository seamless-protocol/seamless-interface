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
