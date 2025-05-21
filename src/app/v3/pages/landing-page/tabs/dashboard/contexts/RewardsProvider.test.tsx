/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import { RewardsProvider, useRewards } from "./RewardsProvider";
import { REWARDS_MOCK_ITEMS } from "./RewardsProvider.mock";

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
      <RewardsProvider items={REWARDS_MOCK_ITEMS}>
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
      <RewardsProvider items={REWARDS_MOCK_ITEMS}>
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
      <RewardsProvider items={REWARDS_MOCK_ITEMS}>
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

    // now the state should have updated
    expect(getByTestId("status-1").textContent).toBe("success");
    expect(getByTestId("current-step").textContent).toBe("1");
  });

  it("cancelStep marks current as failed", () => {
    const { getByTestId } = render(
      <RewardsProvider items={REWARDS_MOCK_ITEMS}>
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
      <RewardsProvider items={REWARDS_MOCK_ITEMS}>
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
});
