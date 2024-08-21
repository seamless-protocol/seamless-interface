import { describe, it, expect } from "vitest";
import { calculateTotalRewards, RewardsByStrategyInfo } from "./UserRewardsByStrategy.math";
import { parseUnits } from "viem";
import { USD_VALUE_DECIMALS } from "../../../../meta";

describe("calculateTotalRewards", () => {
  it("correctly calculates the total rewards in USD from multiple entries", () => {
    const rewardsInfo: RewardsByStrategyInfo[] = [
      {
        rewardsAddress: "0x123",
        rewardsAmount: parseUnits("1000", 18),
        rewardsDecimals: 18,
        tokenPrice: {
          bigIntValue: parseUnits("0.0002", USD_VALUE_DECIMALS),
          decimals: USD_VALUE_DECIMALS,
          symbol: "$",
        },
      },
      {
        rewardsAddress: "0x456",
        rewardsAmount: parseUnits("500", 18),
        rewardsDecimals: 18,
        tokenPrice: {
          bigIntValue: parseUnits("0.0003", USD_VALUE_DECIMALS),
          decimals: USD_VALUE_DECIMALS,
          symbol: "$",
        },
      },
    ];

    const totalRewards = calculateTotalRewards(rewardsInfo);
    expect(totalRewards).toBe(parseUnits("0.35", USD_VALUE_DECIMALS));
  });

  it("returns zero if no rewards info is provided", () => {
    const rewardsInfo: RewardsByStrategyInfo[] = [];
    const totalRewards = calculateTotalRewards(rewardsInfo);
    expect(totalRewards).toBe(0n);
  });

  it("calculates correct total rewards with varying token decimals", () => {
    const rewardsInfo: RewardsByStrategyInfo[] = [
      {
        rewardsAddress: "0x123",
        rewardsAmount: parseUnits("10", 8),
        rewardsDecimals: 8,
        tokenPrice: { bigIntValue: parseUnits("2", USD_VALUE_DECIMALS), decimals: USD_VALUE_DECIMALS, symbol: "$" },
      },
      {
        rewardsAddress: "0x456",
        rewardsAmount: parseUnits("5", 6),
        rewardsDecimals: 6,
        tokenPrice: { bigIntValue: parseUnits("1", USD_VALUE_DECIMALS), decimals: USD_VALUE_DECIMALS, symbol: "$" },
      },
    ];

    // Math: 10 * 2 + 5 * 1 = 25
    const totalRewards = calculateTotalRewards(rewardsInfo);
    expect(totalRewards).toBe(parseUnits("25", USD_VALUE_DECIMALS));
  });
});
