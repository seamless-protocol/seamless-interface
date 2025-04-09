import { useQuery } from "@tanstack/react-query";
import { GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchTotalNumberOfUsers, fetchVolumeLeaderboard } from "./VolumeLeaderboard.fetch";

export const useVolumeLeaderboard = (params: GetPayoutsLeaderboardParams) => {
  return useQuery({
    queryKey: FuulQueryKeys.volumeLeaderboardHook(params),
    queryFn: () => fetchVolumeLeaderboard(params),
  });
};

export const useFetchTotalNumberOfUsers = () => {
  return useQuery({
    queryKey: FuulQueryKeys.totalNumberOfUsersHook(),
    queryFn: () => fetchTotalNumberOfUsers(),
  });
};
