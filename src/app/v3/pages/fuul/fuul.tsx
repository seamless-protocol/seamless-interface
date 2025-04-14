import {
  useFetchPointsLeaderboard,
  useFetchPointsUserPosition,
} from "../../../statev3/fuul/queries/fetch-points-leaderboard/FetchPointsLeaderboard.hook";
import { useFetchUserBalances } from "../../../statev3/fuul/queries/fetch-user-balances/FetchUserBalances.hook";
import { useFetchTotalNumberOfUsers } from "../../../statev3/fuul/queries/fetch-volume-leaderboard/VolumeLeaderboard.hook";

const user_address = "0x559458Aac63528fB18893d797FF223dF4D5fa3C9";
const sbgraph_user_address = "0x0019de95fa9953074432f7e66a8c5e8f043c8218";

// const project_id = "3cddbe7a-cd0b-445b-aebc-e3d9d075d0a7";

export const TestFuulComponent = () => {
  const { data: userBalances } = useFetchUserBalances({
    where: { owner: sbgraph_user_address },
  });

  // Get full leaderboard (all users)
  const { data: leaderboardData } = useFetchPointsLeaderboard({});

  // Get user's total points
  const { data: userPointsData } = useFetchPointsUserPosition(user_address);

  // Get Total users
  const { data: totalUsers } = useFetchTotalNumberOfUsers();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p>UStory: Get user rewards (number of seam/eSeam tokens)</p>
        <h2>🎁 User Rewards (per token) (user: {sbgraph_user_address})</h2>
        <ul>
          {userBalances?.userBalances.map((b, idx) => (
            <li key={idx}>
              [ {idx + 1} ] {b.currencyToken.symbol}: <strong>{b.availableToClaimFormatted.viewValue}</strong> (
              {b.availableToClaim})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>UStory: Ability to sum up points from the table view into an overall Points Total for a user</p>
        <h2>🏆 Total user points (per token) (user: {user_address})</h2>

        <p>
          <strong>{userPointsData?.results[0]?.total_amount}</strong> points
        </p>
      </div>
      <div>
        <p>UStory: Get user ranking x/total users</p>
        <h2>📊 User Rank (user: {user_address})</h2>
        <p>
          Rank: <strong>{userPointsData?.results[0]?.rank ?? "N/A"}</strong> /{" "}
          {userPointsData?.totalNumberOfUsers ?? "N/A"}
        </p>
      </div>
      <div>
        <p>UStory: Get total users</p>
        <h2>🔢 Total Users</h2>
        <p>
          <strong>{totalUsers}</strong> users
        </p>
      </div>
      <div>
        <p>
          UStory: A table in the leaderboard view that would order all wallets who&apos;ve participated by points high
          to low, and create table view showing each wallet, their ranking and overall points
        </p>
        <h2>📋 Leaderboard (Top Participants)</h2>
        <table cellPadding="6" style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Wallet</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.results
              ?.sort((a, b) => Number(b.total_amount) - Number(a.total_amount))
              ?.map((entry) => (
                <tr key={entry.address}>
                  <td>{entry.rank}</td>
                  <td>{entry.address}</td>
                  <td>{entry.total_amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
