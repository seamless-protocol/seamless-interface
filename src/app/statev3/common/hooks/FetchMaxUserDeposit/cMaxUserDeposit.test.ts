import { expect, test } from "vitest";
import { cMaxUserDeposit, FetchBigInt } from "./cMaxUserDeposit.math";

const createFetchBigInt = (value: bigint, decimals: number): FetchBigInt => ({
  bigIntValue: value,
  decimals,
});

const tokenDecimals = 18;

test("returns undefined when both maxDeposit and assetBalance are undefined", () => {
  const result = cMaxUserDeposit(undefined, undefined);
  expect(result).toBeUndefined();
});

test("returns undefined when both maxDeposit and assetBalance are null", () => {
  const result = cMaxUserDeposit(null as any, null as any);
  expect(result).toBeUndefined();
});

test("returns assetBalance when maxDeposit is undefined", () => {
  const assetBalance = createFetchBigInt(100n, tokenDecimals);
  const result = cMaxUserDeposit(undefined, assetBalance);
  expect(result).toBe(100n);
});

test("returns assetBalance when maxDeposit is null", () => {
  const assetBalance = createFetchBigInt(100n, tokenDecimals);
  const result = cMaxUserDeposit(null as any, assetBalance);
  expect(result).toBe(100n);
});

test("returns maxDeposit when assetBalance is undefined", () => {
  const maxDeposit = createFetchBigInt(150n, tokenDecimals);
  const result = cMaxUserDeposit(maxDeposit, undefined);
  expect(result).toBe(150n);
});

test("returns maxDeposit when assetBalance is null", () => {
  const maxDeposit = createFetchBigInt(150n, tokenDecimals);
  const result = cMaxUserDeposit(maxDeposit, null as any);
  expect(result).toBe(150n);
});

test("returns assetBalance when normalized maxDeposit > normalized assetBalance (same decimals)", () => {
  const maxDeposit = createFetchBigInt(200n, tokenDecimals);
  const assetBalance = createFetchBigInt(100n, tokenDecimals);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(100n);
});

test("returns maxDeposit when normalized maxDeposit < normalized assetBalance (same decimals)", () => {
  const maxDeposit = createFetchBigInt(100n, tokenDecimals);
  const assetBalance = createFetchBigInt(200n, tokenDecimals);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(100n);
});

test("returns correct value when both values are equal (same decimals)", () => {
  const value = createFetchBigInt(100n, tokenDecimals);
  const result = cMaxUserDeposit(value, value);
  expect(result).toBe(100n);
});

test("compares values correctly when decimals differ (case 1)", () => {
  const maxDeposit = createFetchBigInt(100n, 6);
  const assetBalance = createFetchBigInt(100n, 18);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(100n);
});

test("compares values correctly when decimals differ (case 2)", () => {
  const maxDeposit = createFetchBigInt(100n, 18);
  const assetBalance = createFetchBigInt(100n, 6);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(100n);
});

test("compares values correctly when decimals are same (case 1)", () => {
  const maxDeposit = createFetchBigInt(300n, 18);
  const assetBalance = createFetchBigInt(200n, 18);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(200n);
});

test("compares values correctly when decimals are same (case 2)", () => {
  const maxDeposit = createFetchBigInt(100n, 18);
  const assetBalance = createFetchBigInt(200n, 18);
  const result = cMaxUserDeposit(maxDeposit, assetBalance);
  expect(result).toBe(100n);
});
