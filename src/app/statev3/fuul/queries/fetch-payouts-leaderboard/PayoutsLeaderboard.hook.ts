import { useQuery } from "@tanstack/react-query";
import { GetPayoutsLeaderboardParams } from "@fuul/sdk/dist/types/api";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchPayoutsLeaderboard } from "./PayoutsLeaderboard.fetch";

export const usePayoutsLeaderboard = (params: GetPayoutsLeaderboardParams) => {
  return useQuery({
    queryKey: FuulQueryKeys.payoutsLeaderboardHook(params),
    queryFn: () => fetchPayoutsLeaderboard(params),
  });
};
