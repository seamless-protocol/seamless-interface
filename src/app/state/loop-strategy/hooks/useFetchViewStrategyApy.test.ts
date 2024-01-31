import { test, expect } from "vitest";
import { ONE_ETHER } from "../../../meta/constants";
import { calculateApy } from "./useFetchViewStrategyApy";

test("calculateApy", async () => {
  let endValue = BigInt(101) * ONE_ETHER;
  let startValue = BigInt(100) * ONE_ETHER;
  let timeWindows = BigInt(60 * 60 * 24 * 30); // 30 days
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(13.72);

  endValue = BigInt(110) * ONE_ETHER;
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(753.24);

  endValue = BigInt(303) * ONE_ETHER;
  startValue = BigInt(300) * ONE_ETHER;
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(13.72);

  endValue = BigInt(330) * ONE_ETHER;
  startValue = BigInt(300) * ONE_ETHER;
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(753.24);

  endValue = BigInt(9000) * ONE_ETHER;
  startValue = BigInt(10000) * ONE_ETHER;
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(-51.69);

  endValue = BigInt(41) * ONE_ETHER;
  startValue = BigInt(40) * ONE_ETHER;
  timeWindows = BigInt(60 * 60 * 24 * 20); // 20 days
  expect(calculateApy(endValue, startValue, timeWindows)).toBeCloseTo(76.16);
});
