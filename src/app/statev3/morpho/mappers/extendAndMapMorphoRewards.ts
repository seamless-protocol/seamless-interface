import { Address } from "viem";
import { FetchUserRewardsResponse, ExtendedUserReward, RewardAmount } from "../types/UserReward";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  Token,
} from "@shared";
import { fetchCoinGeckoAssetPriceByAddress } from "../../common/hooks/useFetchCoinGeckoPrice";
import { cValueInUsd } from "../../common/math/cValueInUsd";

export const pricePrecision = 8;

function addOptionalStrings(a?: string, b?: string): string | undefined {
  if (a === undefined || b === undefined) {
    return undefined;
  }
  return (BigInt(a) + BigInt(b)).toString();
}

/** Sums two user rewards (amount or for_supply) objects together. */
function sumUserRewards(
  current: { total?: string; claimable_now?: string; claimable_next?: string; claimed?: string },
  incoming: { total?: string; claimable_now?: string; claimable_next?: string; claimed?: string }
) {

  return {
    total: addOptionalStrings(current.total, incoming.total),
    claimable_now: addOptionalStrings(current.claimable_now, incoming.claimable_now),
    claimable_next: addOptionalStrings(current.claimable_next, incoming.claimable_next),
    claimed: addOptionalStrings(current.claimed, incoming.claimed),
  };
}

function formatUsdBigInt(usdAmount?: bigint) {
  return formatFetchBigIntToViewBigInt({
    bigIntValue: usdAmount,
    decimals: pricePrecision,
    symbol: "$",
  });
}

/**
 * Extends the rewards data by:
 * 1. Grouping by token address
 * 2. Summing the numeric fields
 * 3. Fetching token metadata & USD price
 * 4. Computing USD values for each field
 * 5. Formatting the amounts
 */
export async function extendAndMapMorphoRewards(
  rewardsResponse: FetchUserRewardsResponse
): Promise<ExtendedUserReward[]> {
  // 1. Group by asset address
  const grouped = new Map<string, typeof rewardsResponse.data>();

  for (const reward of rewardsResponse.data) {
    const { address } = reward.asset;
    if (!grouped.has(address)) {
      grouped.set(address, []);
    }
    grouped.get(address)?.push(reward);
  }

  // 2. For each group, sum up the amounts & fetch token metadata once
  const extendedRewardsPromises = Array.from(grouped.entries()).map(async ([address, rewards]) => {

    const token: Token = await fetchToken(address as Address);
    const priceValue = await fetchCoinGeckoAssetPriceByAddress({
      address: address as Address,
      precision: pricePrecision,
    });

    // Sum up amounts across all matching rewards
    const combined = rewards.reduce<RewardAmount>((acc, r) => {
      const userRewards = r.amount ?? r.for_supply;
      if (userRewards) {
        return sumUserRewards(acc, userRewards);
      }
      return acc;
    }, {
      total: "0",
      claimable_now: "0",
      claimable_next: "0",
      claimed: "0",
    });

    // Convert to bigint for each field
    const totalBigInt = combined.total ? BigInt(combined.total) : undefined;
    const claimableNowBigInt = combined.claimable_now ? BigInt(combined.claimable_now) : undefined;
    const claimableNextBigInt = combined.claimable_next ? BigInt(combined.claimable_next) : undefined;
    const claimedBigInt = combined.claimed ? BigInt(combined.claimed) : undefined;

    // 3. Compute USD value (raw bigint) for each field
    const totalUsd = cValueInUsd(totalBigInt, priceValue, token.decimals);
    const claimableNowUsd = cValueInUsd(claimableNowBigInt, priceValue, token.decimals);
    const claimableNextUsd = cValueInUsd(claimableNextBigInt, priceValue, token.decimals);
    const claimedUsd = cValueInUsd(claimedBigInt, priceValue, token.decimals);

    // 4. Format the raw token amounts for user-friendly display
    const formatted = {
      total: formatFetchBigIntToViewBigInt({
        bigIntValue: combined.total ? BigInt(combined.total) : undefined,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      totalUsd: formatUsdBigInt(totalUsd),

      claimableNow: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNowBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNowUsd: formatUsdBigInt(claimableNowUsd),

      claimableNext: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNextBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNextUsd: formatUsdBigInt(claimableNextUsd),

      claimed: formatFetchBigIntToViewBigInt({
        bigIntValue: claimedBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimedUsd: formatUsdBigInt(claimedUsd),
    };

    // 5. Return a single aggregated object for this token address
    const [firstReward] = rewards;
    return {
      ...firstReward,
      token,
      combinedAmount: combined,
      combinedAmountUsd: {
        bigIntValue: totalUsd,
        symbol: "$",
        decimals: pricePrecision,
      },
      for_supply: undefined,
      amount: undefined,
      formatted,
    };
  });

  const extendedRewards = await Promise.all(extendedRewardsPromises);
  return extendedRewards;
}
