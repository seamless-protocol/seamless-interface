/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import { RewardsProvider, useRewards } from "./RewardsProvider";
import { REWARDS_MOCK_ITEMS } from "./RewardsProvider.mock";
import { SeamlessWriteAsyncParams } from "../../../../../../../shared";

// ─── MOCK THE TWO HOOKS ─────────────────────────────────────────────────────────
vi.mock("../mock-hooks/useMutateClaimSeamRewards", () => ({
  useMutateClaimSeamRewards: ({ settings }: { settings: SeamlessWriteAsyncParams }) => ({
    // always “succeed” for the first reward
    ...REWARDS_MOCK_ITEMS[0],
    claimAllAsync: () => {
      settings.onSuccess?.("0x123");
      return "0x123";
    },
    isClaiming: false,
  }),
}));

vi.mock("../mock-hooks/useMutateClaimAllMorphoRewards", () => ({
  useMutateClaimAllMorphoRewards: ({ settings }: { settings: SeamlessWriteAsyncParams }) => ({
    // always “fail” for the second reward
    ...REWARDS_MOCK_ITEMS[1],
    claimAllAsync: () => {
      settings.onError?.(new Error("Forced failure"));
      return "0x134";
    },
    isClaiming: false,
  }),
}));

vi.mock("../mock-hooks/useMutateClaimVestedEsSEAM", () => ({
  useMutateClaimVestedEsSEAM: ({ settings }: { settings: SeamlessWriteAsyncParams }) => ({
    // always “fail” for the third reward
    ...REWARDS_MOCK_ITEMS[2],
    claimVestedAsync: () => {
      settings.onError?.(new Error("Forced failure"));
      return "0x134";
    },
    isClaimVestedPending: false,
  }),
}));

vi.mock("../mock-hooks/useFetchViewAllUserRewards", () => ({
  useFetchViewAllUserRewards: () => ({
    data: {
      rewards: REWARDS_MOCK_ITEMS,
    },
  }),
}));
// ────────────────────────────────────────────────────────────────────────────────

// A tiny consumer to inspect provider state and actions:
const TestConsumer = () => {
  const { selected, toggleSelect, startClaims, confirmStep, cancelStep, reset, claimOrder, currentStep, statuses } =
    useRewards();

  return (
    <div>
      <div data-testid="selected-size">{selected.size}</div>
      <button data-testid="toggle-1" onClick={() => toggleSelect("1")}>
        Toggle 1
      </button>
      <button data-testid="toggle-2" onClick={() => toggleSelect("2")}>
        Toggle 2
      </button>
      <button data-testid="start" onClick={startClaims}>
        Start
      </button>
      <button data-testid="confirm" onClick={() => confirmStep()}>
        Confirm
      </button>
      <button data-testid="cancel" onClick={cancelStep}>
        Cancel
      </button>
      <button data-testid="reset" onClick={reset}>
        Reset
      </button>
      <div data-testid="claim-order">{claimOrder.join(",")}</div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="status-1">{statuses["1"] || ""}</div>
      <div data-testid="status-2">{statuses["2"] || ""}</div>
    </div>
  );
};

describe("RewardsProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("toggles selection on and off", () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    expect(getByTestId("selected-size").textContent).toBe("0");

    fireEvent.click(getByTestId("toggle-1"));
    expect(getByTestId("selected-size").textContent).toBe("1");

    fireEvent.click(getByTestId("toggle-1"));
    expect(getByTestId("selected-size").textContent).toBe("0");
  });

  it("startClaims initializes order, statuses, and step", () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    // select two items
    fireEvent.click(getByTestId("toggle-1"));
    fireEvent.click(getByTestId("toggle-2"));
    fireEvent.click(getByTestId("start"));

    expect(getByTestId("claim-order").textContent).toBe("1,2");
    expect(getByTestId("current-step").textContent).toBe("0");
    expect(getByTestId("status-1").textContent).toBe("idle");
    expect(getByTestId("status-2").textContent).toBe("idle");
  });

  it("confirmStep calls claimAsync, advances status & step", async () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    // select one and start
    fireEvent.click(getByTestId("toggle-1"));
    fireEvent.click(getByTestId("start"));

    // click Confirm and advance timers inside a single act so React can batch the async update
    await act(async () => {
      fireEvent.click(getByTestId("confirm"));
      vi.advanceTimersByTime(2000);
    });

    expect(getByTestId("status-1").textContent).toBe("success");
    expect(getByTestId("current-step").textContent).toBe("1");
  });

  it("cancelStep marks current as failed", () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    fireEvent.click(getByTestId("toggle-1"));
    fireEvent.click(getByTestId("start"));
    fireEvent.click(getByTestId("cancel"));

    expect(getByTestId("status-1").textContent).toBe("failed");
  });

  it("reset clears all state", () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    fireEvent.click(getByTestId("toggle-1"));
    fireEvent.click(getByTestId("start"));
    fireEvent.click(getByTestId("reset"));

    expect(getByTestId("selected-size").textContent).toBe("0");
    expect(getByTestId("claim-order").textContent).toBe("");
    expect(getByTestId("current-step").textContent).toBe("0");
    expect(getByTestId("status-1").textContent).toBe("");
    expect(getByTestId("status-2").textContent).toBe("");
  });

  it("confirmStep handles onError and advances status & step", async () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    // just the second item
    fireEvent.click(getByTestId("toggle-2"));
    fireEvent.click(getByTestId("start"));

    await act(async () => {
      fireEvent.click(getByTestId("confirm"));
      vi.advanceTimersByTime(0);
    });

    expect(getByTestId("status-2").textContent).toBe("failed");
    expect(getByTestId("current-step").textContent).toBe("1");
  });

  it("after an error, manual confirm runs the next reward", async () => {
    const { getByTestId } = render(
      <RewardsProvider>
        <TestConsumer />
      </RewardsProvider>
    );

    // select both in order
    fireEvent.click(getByTestId("toggle-1"));
    fireEvent.click(getByTestId("toggle-2"));
    fireEvent.click(getByTestId("start"));

    // 1st is always success
    await act(async () => {
      fireEvent.click(getByTestId("confirm"));
      vi.advanceTimersByTime(0);
    });
    expect(getByTestId("status-1").textContent).toBe("success");
    expect(getByTestId("current-step").textContent).toBe("1");

    // 2nd is always failure
    await act(async () => {
      fireEvent.click(getByTestId("confirm"));
      vi.advanceTimersByTime(0);
    });
    expect(getByTestId("status-2").textContent).toBe("failed");
    expect(getByTestId("current-step").textContent).toBe("2");
  });
});
