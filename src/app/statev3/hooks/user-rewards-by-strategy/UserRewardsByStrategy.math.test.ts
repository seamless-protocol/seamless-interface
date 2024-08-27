import { describe, it, expect } from "vitest";
import { cTotalRewards, RewardsByStrategyInfo } from "./UserRewardsByStrategy.math";
import { parseUnits } from "viem";
import { USD_VALUE_DECIMALS } from "@meta";

describe("calculateTotalRewards", () => {
  it("returns zero if no rewards info is provided", () => {
    const totalRewards = cTotalRewards([]);
    expect(totalRewards).toBe(0n);
  });

  it("calculates correct total rewards with varying token decimals", () => {
    const rewardsInfo: RewardsByStrategyInfo[] = [
      {
        dollarAmount: {
          bigIntValue: parseUnits("5", USD_VALUE_DECIMALS),
          symbol: "",
          decimals: USD_VALUE_DECIMALS,
        },
      },
      {
        dollarAmount: {
          bigIntValue: parseUnits("10", USD_VALUE_DECIMALS),
          symbol: "",
          decimals: USD_VALUE_DECIMALS,
        },
      },
    ];

    const totalRewards = cTotalRewards(rewardsInfo);
    expect(totalRewards).toBe(parseUnits("15", USD_VALUE_DECIMALS));
  });
});
