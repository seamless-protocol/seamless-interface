import { useQuery } from "@tanstack/react-query";
import { GetPointsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { fetchPointsLeaderboard } from "./FetchPointsLeaderboard.fetch";
import { fetchPointsUserPosition } from "./FetchPointsLeaderboard.mapper";
import { Address } from "viem";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const useFetchPointsLeaderboard = (params: GetPointsLeaderboardParams) => {
  return useQuery({
    queryKey: FuulQueryKeys.pointsLeaderboardHook(params),
    queryFn: () => fetchPointsLeaderboard(params),
  });
};

export const useFetchPointsUserPosition = (user?: Address) => {
  return useQuery({
    queryKey: FuulQueryKeys.pointsUserPositionHook(user!),
    queryFn: () => fetchPointsUserPosition(user!),
    enabled: Boolean(user),
  });
};
