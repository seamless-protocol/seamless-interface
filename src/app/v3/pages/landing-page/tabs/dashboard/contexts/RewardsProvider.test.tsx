// src/contexts/__tests__/RewardsProvider.test.tsx
import React from "react";
import { RewardItem, RewardsProvider, useRewards } from "./RewardsProvider";

describe("RewardsProvider", () => {
  const items: RewardItem[] = [
    { id: "1", icon: <div />, name: "One", description: "Desc", tokenAmount: 1, dollarAmount: 10 },
    { id: "2", icon: <div />, name: "Two", description: "Desc", tokenAmount: 2, dollarAmount: 20 },
  ];

  const wrapper: React.FC = ({ children }) => <RewardsProvider items={items}>{children}</RewardsProvider>;

  it("toggles selection", () => {
    const { result } = renderHook(() => useRewards(), { wrapper });
    act(() => result.current.toggleSelect("1"));
    expect(result.current.selected.has("1")).toBe(true);
    act(() => result.current.toggleSelect("1"));
    expect(result.current.selected.has("1")).toBe(false);
  });

  it("startClaims initializes claimOrder and statuses", () => {
    const { result } = renderHook(() => useRewards(), { wrapper });
    act(() => {
      result.current.toggleSelect("1");
      result.current.toggleSelect("2");
    });
    act(() => result.current.startClaims(async (id) => Promise.resolve()));
    expect(result.current.claimOrder).toEqual(["1", "2"]);
    expect(result.current.statuses).toEqual({ "1": "idle", "2": "idle" });
    expect(result.current.currentStep).toBe(0);
  });

  it("confirmStep updates status and advances step", async () => {
    const { result } = renderHook(() => useRewards(), { wrapper });
    act(() => result.current.toggleSelect("1"));
    act(() => result.current.startClaims((id) => Promise.resolve()));
    await act(async () => {
      await result.current.confirmStep();
    });
    expect(result.current.statuses["1"]).toBe("success");
    expect(result.current.currentStep).toBe(1);
  });

  it("cancelStep sets status to cancelled", () => {
    const { result } = renderHook(() => useRewards(), { wrapper });
    act(() => result.current.toggleSelect("1"));
    act(() => result.current.startClaims((id) => Promise.resolve()));
    act(() => result.current.cancelStep());
    expect(result.current.statuses["1"]).toBe("cancelled");
  });

  it("reset clears all state", () => {
    const { result } = renderHook(() => useRewards(), { wrapper });
    act(() => result.current.toggleSelect("1"));
    act(() => result.current.startClaims((id) => Promise.resolve()));
    act(() => result.current.reset());
    expect(result.current.selected.size).toBe(0);
    expect(result.current.claimOrder).toEqual([]);
    expect(result.current.statuses).toEqual({});
    expect(result.current.currentStep).toBe(0);
  });
});
