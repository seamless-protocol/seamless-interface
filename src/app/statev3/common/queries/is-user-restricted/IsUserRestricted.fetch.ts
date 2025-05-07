// src/hooks/useCountry.ts
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { CountryDataKeys } from "../../query-keys/CountryDataQueryKeys";

export async function fetchIsUserRestricted(): Promise<string> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    queryKey: CountryDataKeys.fetchIsUserRestricted(),
    queryFn: async () => {
      const res = await fetch(import.meta.env.VITE_CLIENT_METADATA_API);
      if (!res.ok) throw new Error("fetchIsUserRestricted: Failed to fetch user data");
      const data = await res.json();
      return data.isBlocked;
    },
    ...queryConfig.metadataQueryConfig,
  });
}
