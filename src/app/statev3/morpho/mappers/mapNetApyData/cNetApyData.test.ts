import { expect, test } from "vitest";
import { cNetApyData } from "./cNetApyData";

const dummyAsset = {
  address: "0xabc",
  name: "Token A",
  symbol: "TKA",
  logoURI: "a.png",
  decimals: 18,
};

const dummyAsset2 = {
  address: "0xdef",
  name: "Token B",
  symbol: "TKB",
  logoURI: "b.png",
  decimals: 18,
};

test("cNetApyData calculates net APY correctly with no rewards", () => {
  const vaultState = {
    totalAssets: 1000,
    netApy: 0.1, // 10%
    rewards: [],
    allocation: [],
  };

  const result = cNetApyData(vaultState as any);
  expect(result?.netApy).toBe(10); // 0.1 * 100
  expect(result?.nativeAPY).toBe(10); // 0.1 * 100 (no rewards)
  expect(result?.rewards).toEqual([]);
});

test("cNetApyData calculates vault-level reward correctly", () => {
  const vaultState = {
    totalAssets: 1000,
    netApy: 0.1,
    // Vault-level reward uses dummyAsset
    rewards: [{ asset: dummyAsset, supplyApr: 0.02 }],
    allocation: [],
  };

  const result = cNetApyData(vaultState as any);
  expect(result?.netApy).toBe(10);
  expect(result?.nativeAPY).toBe(8); // 0.1 - 0.02 = 0.08 -> 8%
  expect(result?.rewards).toEqual([
    { asset: dummyAsset, totalApr: 2 }, // 0.02 -> 2%
  ]);
});

test("cNetApyData sums rewards from multiple sources (different assets)", () => {
  const vaultState = {
    totalAssets: 1000,
    netApy: 0.1, // 10%
    // Vault-level reward uses dummyAsset
    rewards: [{ asset: dummyAsset, supplyApr: 0.02 }], // 2%
    allocation: [
      {
        supplyAssets: 500,
        market: {
          state: {
            // Market-level reward uses dummyAsset2 to ensure it's a different asset
            rewards: [{ asset: dummyAsset2, supplyApr: 0.04 }], // 4%
          },
        },
      },
    ],
  };

  // Calculation:
  // - Vault-level dummyAsset => 0.02
  // - Allocation dummyAsset2 => weighted 0.04 * (500 / 1000) = 0.02
  // -> totalRewards = 0.02 (dummyAsset) + 0.02 (dummyAsset2) = 0.04
  // -> rest = 0.1 - 0.04 = 0.06

  const result = cNetApyData(vaultState as any);

  expect(result?.netApy).toBeCloseTo(10, 5); // 10%
  expect(result?.nativeAPY).toBeCloseTo(6, 5); // 6%
  expect(result?.rewards).toHaveLength(2);

  // Because they are separate assets, we'll have two distinct reward entries.
  // One for dummyAsset (2%), one for dummyAsset2 (2%).
  expect(result?.rewards).toEqual(
    expect.arrayContaining([
      { asset: dummyAsset, totalApr: 2 },
      { asset: dummyAsset2, totalApr: 2 },
    ])
  );
});

test("cNetApyData skips invalid allocations", () => {
  const vaultState = {
    totalAssets: 1000,
    netApy: 0.1,
    rewards: [],
    allocation: [
      {
        supplyAssets: 0, // invalid => should be skipped
        market: { state: { rewards: [{ asset: dummyAsset2, supplyApr: 0.05 }] } },
      },
    ],
  };

  // Because supplyAssets=0, that allocation is skipped entirely, so no extra rewards.
  const result = cNetApyData(vaultState as any);
  expect(result?.nativeAPY).toBe(10); // 0.1 * 100 = 10
  expect(result?.rewards).toHaveLength(0);
});

test("cNetApyData aggregates multiple allocations correctly (different assets)", () => {
  const vaultState = {
    totalAssets: 1000,
    netApy: 0.1, // 10%
    // Vault-level reward: dummyAsset
    rewards: [
      {
        asset: dummyAsset,
        supplyApr: 0.02, // 2%
      },
    ],
    allocation: [
      // First allocation: 300/1000 assets with 3% APR, dummyAsset2
      {
        supplyAssets: 300,
        market: {
          state: {
            rewards: [
              {
                asset: dummyAsset2,
                supplyApr: 0.03, // 3%
              },
            ],
          },
        },
      },
      // Second allocation: 500/1000 assets with 5% APR, dummyAsset2
      {
        supplyAssets: 500,
        market: {
          state: {
            rewards: [
              {
                asset: dummyAsset2,
                supplyApr: 0.05, // 5%
              },
            ],
          },
        },
      },
    ],
  };

  // Calculation breakdown:
  // Vault-level dummyAsset: 0.02 => 2%
  // Allocation #1 (dummyAsset2): weighted 0.03 * (300/1000) = 0.009
  // Allocation #2 (dummyAsset2): weighted 0.05 * (500/1000) = 0.025
  // => totalRewards = 0.02 (dummyAsset) + (0.009 + 0.025) (dummyAsset2) = 0.054
  // => restValue = 0.1 - 0.054 = 0.046

  const result = cNetApyData(vaultState as any);

  expect(result?.netApy).toBeCloseTo(10, 5); // 10%
  expect(result?.nativeAPY).toBeCloseTo(4.6, 5); // 4.6%
  expect(result?.rewards).toHaveLength(2);

  expect(result?.rewards).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        asset: dummyAsset,
        totalApr: 2,
      }),
      expect.objectContaining({
        asset: dummyAsset2,
        totalApr: expect.closeTo(3.4, 6),
      }),
    ])
  );
});
