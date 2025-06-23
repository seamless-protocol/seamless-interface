import { useEffect } from "react";
import { getFuulClient } from "../../../config/fuul-client";
import { useMutateClaimFuulRewards } from "../../../data/fuul/mutations/useMutateClaimFuulRewards";
import { Buttonv2 } from "../../../../shared";
import { usePayoutsLeaderboard } from "../../../data/fuul/queries/fetch-payouts-leaderboard/PayoutsLeaderboard.hook";
import { useFetchPointsLeaderboard, useFetchPointsUserPosition } from "../../../data/fuul/queries/fetch-points-leaderboard/FetchPointsLeaderboard.hook";
import { useFetchUserBalances } from "../../../data/fuul/queries/fetch-user-balances/FetchUserBalances.hook";
import { useFetchTotalNumberOfUsers } from "../../../data/fuul/queries/fetch-volume-leaderboard/VolumeLeaderboard.hook";

const user_address = "0x559458Aac63528fB18893d797FF223dF4D5fa3C9";
const sbgraph_user_address = "0x0019de95fa9953074432f7e66a8c5e8f043c8218";
const payouts_user_addres = "0x2151C90C93F52bE82186f162c86DaEABc8911188";
// const morpho_user_address = "0xa5D42Cf398bd3076eC26dA93A8270b8e75b8062c";

// const project_id = "3cddbe7a-cd0b-445b-aebc-e3d9d075d0a7";
// const project_id = "seamless";

export const TestFuulComponent = () => {
  // Subgraph user balances (rewardtokens)
  const { data: userBalances } = useFetchUserBalances({
    where: {
      owner_: {
        address: sbgraph_user_address.toLowerCase(),
      },
      project_: { deployedAddress: import.meta.env.VITE_FUUL_DEPLOYED_ADDRESS },
    },
  });

  const { data: payoutsLeaderboardData } = usePayoutsLeaderboard({
    page_size: 5,
  });
  const { data: payoutsForAuser } = usePayoutsLeaderboard({
    user_address: payouts_user_addres,
    project_id: "seamless",
  });
  // eslint-disable-next-line no-console
  console.log({ payoutsLeaderboardData });
  // eslint-disable-next-line no-console
  console.log({ payoutsForAuser });

  useEffect(() => {
    const test = async () => {
      const fuulClient = getFuulClient();
      const rez = await fuulClient.getConversions({});
      // eslint-disable-next-line no-console
      console.log({ rez });
    };

    test();
  }, []);

  // Get full leaderboard (all users)
  const { data: leaderboardData } = useFetchPointsLeaderboard({
    page_size: 5,
  });
  // eslint-disable-next-line no-console
  console.log({ leaderboardData });

  // Get user's total points
  const { data: userPointsData } = useFetchPointsUserPosition(user_address);

  // Get Total users
  const { data: totalUsers } = useFetchTotalNumberOfUsers();

  // claim rewards
  const { claimFuulRewardsAsync } = useMutateClaimFuulRewards();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div>
          <p>UStory: Claim rewards</p>
          <h2>🎁 Claim rewards (user: {sbgraph_user_address})</h2>
          <Buttonv2 onClick={() => claimFuulRewardsAsync()}>Claim rewards</Buttonv2>
        </div>

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
              // @ts-ignore
              ?.sort((a, b) => Number(b.total_amount) - Number(a.total_amount))
              // @ts-ignore
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

      <div>
        <p>
          UStory: A payouts (token) table in the leaderboard view that would order all wallets who&apos;ve participated
          by points high to low, and create table view showing each wallet, their ranking and overall points
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
            {payoutsLeaderboardData?.results
              // @ts-ignore
              ?.sort((a, b) => Number(b.total_amount) - Number(a.total_amount))
              // @ts-ignore
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
