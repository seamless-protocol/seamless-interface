import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "../../../settings/queryConfig";
import { GetPointsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchPointsLeaderboard } from "./FetchPointsLeaderboard.fetch";

export const usePointsLeaderboard = (params: GetPointsLeaderboardParams) => {
  return useQuery({
    queryKey: FuulQueryKeys.pointsLeaderboardHook(params),
    queryFn: () => fetchPointsLeaderboard(params),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};
