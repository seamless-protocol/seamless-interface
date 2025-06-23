import { Address } from "viem";
import {
  FetchUserRewardsResponse,
  RewardAmount,
  RewardAmountBigInt,
  SummedUserReward,
  UserReward,
} from "../types/UserReward";

import { fetchToken, Token, formatFetchBigIntToViewBigInt, fUsdValueStructured } from "@shared";
import { fetchCoinGeckoAssetPriceByAddress } from "../../common/hooks/useFetchCoinGeckoPrice";
import { cValueInUsd } from "../../common/math/cValueInUsd";

export const pricePrecision = 8;

export function parseRewardAmount(amount?: RewardAmount): RewardAmountBigInt {
  if (!amount) {
    return {};
  }

  return {
    total: amount.total ? BigInt(amount.total) : undefined,
    claimable_now: amount.claimable_now ? BigInt(amount.claimable_now) : undefined,
    claimable_next: amount.claimable_next ? BigInt(amount.claimable_next) : undefined,
    claimed: amount.claimed ? BigInt(amount.claimed) : undefined,
  };
}

function addOptionalBigInt(a?: bigint, b?: bigint): bigint | undefined {
  if (a === undefined) return b;
  if (b === undefined) return a;
  return a + b;
}

export function sumRewardAmountsBigInt(current: RewardAmountBigInt, incoming: RewardAmountBigInt): RewardAmountBigInt {
  return {
    total: addOptionalBigInt(current.total, incoming.total),
    claimable_now: addOptionalBigInt(current.claimable_now, incoming.claimable_now),
    claimable_next: addOptionalBigInt(current.claimable_next, incoming.claimable_next),
    claimed: addOptionalBigInt(current.claimed, incoming.claimed),
  };
}

export async function extendAndMapMorphoRewards(
  rewardsResponse: FetchUserRewardsResponse
): Promise<SummedUserReward[]> {
  // 1. Group by asset.address
  const grouped = new Map<string, UserReward[]>();

  for (const reward of rewardsResponse.data) {
    const addr = reward.asset.address;
    if (!grouped.has(addr)) {
      grouped.set(addr, []);
    }
    grouped.get(addr)!.push(reward);
  }

  // 2. For each group, sum up the amounts in BigInt
  const extendedRewardsPromises = Array.from(grouped.entries()).map(async ([address, rewards]) => {
    const first = rewards[0];

    // 2a. Fetch token metadata
    const token: Token = await fetchToken(address as Address);

    // 2b. Fetch USD price
    const priceValue = await fetchCoinGeckoAssetPriceByAddress({
      address: address as Address,
      precision: pricePrecision,
    });

    // 2c. Sum up amounts across all matching rewards, but in BigInt
    const combinedAmountBigInt = rewards.reduce<RewardAmountBigInt>((acc, r) => {
      const userRewards = parseRewardAmount(r.amount ?? r.for_supply);
      return sumRewardAmountsBigInt(acc, userRewards);
    }, {});

    // Extract each field
    const totalBigInt = combinedAmountBigInt.total;
    const claimableNowBigInt = combinedAmountBigInt.claimable_now;
    const claimableNextBigInt = combinedAmountBigInt.claimable_next;
    const claimedBigInt = combinedAmountBigInt.claimed;

    // 2d. Compute USD value for each field (bigint -> bigint)
    const totalUsdBigInt = cValueInUsd(totalBigInt, priceValue, token.decimals);
    const claimableNowUsdBigInt = cValueInUsd(claimableNowBigInt, priceValue, token.decimals);
    const claimableNextUsdBigInt = cValueInUsd(claimableNextBigInt, priceValue, token.decimals);
    const claimedUsdBigInt = cValueInUsd(claimedBigInt, priceValue, token.decimals);

    // 2e. Format for display only
    const formatted = {
      total: formatFetchBigIntToViewBigInt({
        bigIntValue: totalBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      totalUsd: formatFetchBigIntToViewBigInt({
        bigIntValue: totalUsdBigInt,
        decimals: pricePrecision,
        symbol: "$",
      }),

      claimableNow: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNowBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNowUsd: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNowUsdBigInt,
        decimals: pricePrecision,
        symbol: "$",
      }),

      claimableNext: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNextBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimableNextUsd: formatFetchBigIntToViewBigInt({
        bigIntValue: claimableNextUsdBigInt,
        decimals: pricePrecision,
        symbol: "$",
      }),

      claimed: formatFetchBigIntToViewBigInt({
        bigIntValue: claimedBigInt,
        decimals: token.decimals,
        symbol: token.symbol,
      }),
      claimedUsd: formatFetchBigIntToViewBigInt({
        bigIntValue: claimedUsdBigInt,
        decimals: pricePrecision,
        symbol: "$",
      }),
    };

    // 2f. Build the SummedUserReward
    return {
      asset: first.asset,
      token,
      combinedAmount: combinedAmountBigInt,
      combinedClaimableNowUsd: fUsdValueStructured(claimableNowUsdBigInt),
      combinedClaimableNextUsd: fUsdValueStructured(claimableNextUsdBigInt),
      formatted,
    };
  });

  const extendedRewards = await Promise.all(extendedRewardsPromises);
  return extendedRewards;
}
