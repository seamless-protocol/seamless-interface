import { GetPointsLeaderboardParams, LeaderboardResponse, PointsLeaderboard } from "@fuul/sdk/dist/types/api";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { getFuulClient } from "../../../../config/fuul-client";

export const fetchPointsLeaderboardQueryOptions = (params: GetPointsLeaderboardParams) => ({
  queryKey: FuulQueryKeys.pointsLeaderboard(params),
  queryFn: async (): Promise<LeaderboardResponse<PointsLeaderboard>> => {
    const client = getFuulClient();
    return client.getPointsLeaderboard(params);
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchPointsLeaderboard(params: GetPointsLeaderboardParams) {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchPointsLeaderboardQueryOptions(params),
  });
}
