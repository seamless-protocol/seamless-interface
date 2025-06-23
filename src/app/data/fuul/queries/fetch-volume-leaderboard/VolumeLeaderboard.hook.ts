import { useQuery } from "@tanstack/react-query";
import { GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { fetchTotalNumberOfUsers, fetchVolumeLeaderboard } from "./VolumeLeaderboard.fetch";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

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
