import type { Conversion, GetConversionsParams } from "@fuul/sdk/dist/types/api";
import { getFuulClient } from "@app/config/fuul-client";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const fetchAllConversionsQueryOptions = (params: GetConversionsParams) => ({
  queryKey: FuulQueryKeys.conversions(params),
  queryFn: async (): Promise<Conversion[]> => {
    const client = getFuulClient();
    return client.getConversions(params);
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchAllConversions(params: GetConversionsParams): Promise<Conversion[]> {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchAllConversionsQueryOptions(params),
  });
}
