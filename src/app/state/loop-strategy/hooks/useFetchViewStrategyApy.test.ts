import { test, expect } from "vitest";
import { ONE_ETHER } from "@meta";
import { calculateApy } from "./useFetchViewStrategyApy";

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatOnTwoDecimals(
  input: number | bigint | undefined
): string {
  return formatter.format(input || 0);
}

function calculateApyWrapper(
  endValue: bigint,
  startValue: bigint,
  timeWindows: bigint
) {
  return Number(
    formatOnTwoDecimals(calculateApy(endValue, startValue, timeWindows))
  );
}

test("calculateApy", async () => {
  let endValue = BigInt(101) * ONE_ETHER;
  let startValue = BigInt(100) * ONE_ETHER;
  let timeWindows = BigInt(60 * 60 * 24 * 30); // 30 days
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(13.72);

  endValue = BigInt(110) * ONE_ETHER;
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(753.24);

  endValue = BigInt(303) * ONE_ETHER;
  startValue = BigInt(300) * ONE_ETHER;
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(13.72);

  endValue = BigInt(330) * ONE_ETHER;
  startValue = BigInt(300) * ONE_ETHER;
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(753.24);

  endValue = BigInt(9000) * ONE_ETHER;
  startValue = BigInt(10000) * ONE_ETHER;
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(-51.69);

  endValue = BigInt(41) * ONE_ETHER;
  startValue = BigInt(40) * ONE_ETHER;
  timeWindows = BigInt(60 * 60 * 24 * 20); // 20 days
  expect(calculateApyWrapper(endValue, startValue, timeWindows)).toBe(76.16);
});
