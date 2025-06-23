import { GetPayoutsLeaderboardParams, LeaderboardResponse, PayoutsLeaderboard } from "@fuul/sdk/dist/types/api";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { getFuulClient } from "../../../../config/fuul-client";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const fetchPayoutsLeaderboardQueryOptions = (params: GetPayoutsLeaderboardParams) => ({
  queryKey: FuulQueryKeys.payoutsLeaderboard(params),
  queryFn: async (): Promise<LeaderboardResponse<PayoutsLeaderboard>> => {
    const client = getFuulClient();
    return client.getPayoutsLeaderboard(params);
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchPayoutsLeaderboard(params: GetPayoutsLeaderboardParams) {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchPayoutsLeaderboardQueryOptions(params),
  });
}
