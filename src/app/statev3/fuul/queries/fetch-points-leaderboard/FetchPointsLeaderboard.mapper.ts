import { Address } from "viem";
import { fetchPointsLeaderboard } from "./FetchPointsLeaderboard.fetch";
import { fetchTotalNumberOfUsers } from "../fetch-volume-leaderboard/VolumeLeaderboard.fetch";

export async function fetchPointsUserPosition(userAddress: Address) {
  const [userPosition, totalNumberOfUsers] = await Promise.all([
    fetchPointsLeaderboard({
      userAddress,
    }),
    fetchTotalNumberOfUsers(),
  ]);

  return {
    ...userPosition,
    totalNumberOfUsers,
  };
}
