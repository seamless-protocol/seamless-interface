import { Address } from "viem";
import { FetchUserRewardsResponse, ExtendedUserReward } from "../types/UserReward";
import { fetchToken, formatFetchBigIntToViewBigInt, Token } from "@shared";

function sumUserRewards(
  current: { total?: string; claimable_now?: string; claimable_next?: string; claimed?: string },
  incoming: { total?: string; claimable_now?: string; claimable_next?: string; claimed?: string }
) {
  const cTotal = BigInt(current.total ?? "0");
  const cClaimableNow = BigInt(current.claimable_now ?? "0");
  const cClaimableNext = BigInt(current.claimable_next ?? "0");
  const cClaimed = BigInt(current.claimed ?? "0");

  const iTotal = BigInt(incoming.total ?? "0");
  const iClaimableNow = BigInt(incoming.claimable_now ?? "0");
  const iClaimableNext = BigInt(incoming.claimable_next ?? "0");
  const iClaimed = BigInt(incoming.claimed ?? "0");

  return {
    total: (cTotal + iTotal).toString(),
    claimable_now: (cClaimableNow + iClaimableNow).toString(),
    claimable_next: (cClaimableNext + iClaimableNext).toString(),
    claimed: (cClaimed + iClaimed).toString(),
  };
}

/**
 * Extends the rewards data by:
 * 1. Grouping by token address
 * 2. Summing the numeric fields
 * 3. Fetching token metadata once
 * 4. Formatting the combined amounts
 */
export async function extendAndMapMorphoRewards(
  rewardsResponse: FetchUserRewardsResponse
): Promise<ExtendedUserReward[]> {
  const grouped = new Map<string, typeof rewardsResponse.data>();

  // eslint-disable-next-line no-restricted-syntax
  for (const reward of rewardsResponse.data) {
    const { address } = reward.asset;
    if (!grouped.has(address)) {
      grouped.set(address, []);
    }
    grouped.get(address)?.push(reward);
  }

  const extendedRewardsPromises = Array.from(grouped.entries()).map(async ([address, rewards]) => {
    // fetch token metadata
    const token: Token = await fetchToken(address as Address);

    // sum up amounts across all matching rewards
    const combined = rewards.reduce((acc, r) => {
      const userRewards = r.amount ?? r.for_supply;
      if (userRewards) {
        return sumUserRewards(acc, userRewards);
      }
      return acc;
    }, { total: "0", claimable_now: "0", claimable_next: "0", claimed: "0" });

    const formatted = {
      total: formatFetchBigIntToViewBigInt({
        bigIntValue: BigInt(combined.total),
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNow: formatFetchBigIntToViewBigInt({
        bigIntValue: BigInt(combined.claimable_now),
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNext: formatFetchBigIntToViewBigInt({
        bigIntValue: BigInt(combined.claimable_next),
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimed: formatFetchBigIntToViewBigInt({
        bigIntValue: BigInt(combined.claimed),
        decimals: token.decimals,
        symbol: token.symbol,
      }),
    };

    const [firstReward] = rewards;
    return {
      ...firstReward,
      token,
      combinedAmount: combined,
      for_supply: undefined,
      amount: undefined,
      formatted,
    };
  });

  const extendedRewards = await Promise.all(extendedRewardsPromises);
  return extendedRewards;
}
