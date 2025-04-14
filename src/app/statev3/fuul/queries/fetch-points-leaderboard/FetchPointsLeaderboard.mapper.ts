import { Address } from "viem";
import { fetchPointsLeaderboard } from "./FetchPointsLeaderboard.fetch";
import { fetchTotalNumberOfUsers } from "../fetch-volume-leaderboard/VolumeLeaderboard.fetch";

export async function fetchPointsUserPosition(user_address: Address) {
  const [userPosition, totalNumberOfUsers] = await Promise.all([
    fetchPointsLeaderboard({
      user_address,
    }),
    fetchTotalNumberOfUsers(),
  ]);

  return {
    ...userPosition,
    totalNumberOfUsers,
  };
}
