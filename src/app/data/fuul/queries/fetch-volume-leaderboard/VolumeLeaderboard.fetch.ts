import { GetPayoutsLeaderboardParams, LeaderboardResponse, VolumeLeaderboard } from "@fuul/sdk/dist/types/api";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { getFuulClient } from "../../../../config/fuul-client";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const fetchVolumeLeaderboardQueryOptions = (params: GetPayoutsLeaderboardParams) => ({
  queryKey: FuulQueryKeys.volumeLeaderboard(params),
  queryFn: async (): Promise<LeaderboardResponse<VolumeLeaderboard>> => {
    const client = getFuulClient();
    return client.getVolumeLeaderboard(params);
  },
  ...queryConfig.semiSensitiveDataQueryConfig,
});

export async function fetchVolumeLeaderboard(params: GetPayoutsLeaderboardParams) {
  const queryClient = getQueryClient();
  return queryClient.fetchQuery({
    ...fetchVolumeLeaderboardQueryOptions(params),
  });
}

export async function fetchTotalNumberOfUsers() {
  const queryClient = getQueryClient();
  const result = await queryClient.fetchQuery({
    ...fetchVolumeLeaderboardQueryOptions({}),
  });

  return result.total_results;
}
