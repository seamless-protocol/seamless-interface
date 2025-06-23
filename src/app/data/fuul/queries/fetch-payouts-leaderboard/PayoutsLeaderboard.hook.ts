import { useQuery } from "@tanstack/react-query";
import { GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { fetchPayoutsLeaderboard } from "./PayoutsLeaderboard.fetch";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const usePayoutsLeaderboard = (params: GetPayoutsLeaderboardParams) => {
  return useQuery({
    queryKey: FuulQueryKeys.payoutsLeaderboardHook(params),
    queryFn: () => fetchPayoutsLeaderboard(params),
  });
};
