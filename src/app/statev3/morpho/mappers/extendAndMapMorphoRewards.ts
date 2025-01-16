import { Address } from "viem";
import { FetchUserRewardsResponse, ExtendedUserReward } from "../types/UserReward";
import {
  fetchToken,
  formatFetchBigIntToViewBigInt,
  Token,
} from "@shared";
import { fetchCoinGeckoAssetPriceByAddress } from "../../common/hooks/useFetchCoinGeckoPrice";
import { cValueInUsd } from "../../math/utils";

export const pricePrecision = 8;

/** Sums two user rewards (amount or for_supply) objects together. */
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

function formatUsdBigInt(usdAmount: bigint) {
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

  // eslint-disable-next-line no-restricted-syntax
  for (const reward of rewardsResponse.data) {
    const { address } = reward.asset;
    if (!grouped.has(address)) {
      grouped.set(address, []);
    }
    grouped.get(address)?.push(reward);
  }

  // 2. For each group, sum up the amounts & fetch token metadata once
  const extendedRewardsPromises = Array.from(grouped.entries()).map(async ([address, rewards]) => {
    // Fetch token metadata
    const token: Token = await fetchToken(address as Address);

    // Fetch token USD price as a bigint
    const priceValue = await fetchCoinGeckoAssetPriceByAddress({
      address: address as Address,
      precision: pricePrecision,
    });

    // Sum up amounts across all matching rewards
    const combined = rewards.reduce((acc, r) => {
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
    const totalBigInt = BigInt(combined.total);
    const claimableNowBigInt = BigInt(combined.claimable_now);
    const claimableNextBigInt = BigInt(combined.claimable_next);
    const claimedBigInt = BigInt(combined.claimed);

    // 3. Compute USD value (raw bigint) for each field
    const totalUsd = cValueInUsd(totalBigInt, priceValue, token.decimals);
    const claimableNowUsd = cValueInUsd(claimableNowBigInt, priceValue, token.decimals);
    const claimableNextUsd = cValueInUsd(claimableNextBigInt, priceValue, token.decimals);
    const claimedUsd = cValueInUsd(claimedBigInt, priceValue, token.decimals);

    // 4. Format the raw token amounts for user-friendly display
    const formatted = {
      total: formatFetchBigIntToViewBigInt({
        bigIntValue: totalBigInt,
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
