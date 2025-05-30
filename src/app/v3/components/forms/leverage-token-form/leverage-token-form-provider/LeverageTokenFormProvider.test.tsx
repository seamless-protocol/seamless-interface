/**
 * @vitest-environment jsdom
 */
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import type { Mock } from "vitest";

import { LeverageTokenFormProvider, useLeverageTokenFormContext } from "./LeverageTokenFormProvider";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";

// Centralized mock values for easy maintenance
const MOCK_VALUES = {
  userAddress: "0xUSER_ADDRESS",
  balance: "100",
  lpBalance: "100",
  price: "200",
  maxDeposit: "50",
  depositShares: "5",
  withdrawAssets: "3",
  leverageToken: {
    address: "0xTOK",
    underlyingAssetAddress: "0xUNDER",
    underlyingAsset: { decimals: 18 },
    tokenData: { decimals: 6 },
  },
};

// 1) Stub out @shared completely
vi.mock("@shared", () => ({
  __esModule: true,
  useERC20Approve: () => ({
    isApproved: true,
    isApproving: false,
    justApproved: false,
    approveAsync: async () => {},
  }),
  Displayable: {},
  FetchData: {},
  ViewBigInt: {},
  SeamlessWriteAsyncParams: {},
}));

// 2) Stub wagmi/useAccount
vi.mock("wagmi", () => ({
  useAccount: vi.fn(() => ({
    address: MOCK_VALUES.userAddress,
    isConnected: true,
  })),
}));

// 3) Stub leverage-token lookup
vi.mock("../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress", () => ({
  useFetchLeverageTokenByAddress: vi.fn(() => ({
    data: { ...MOCK_VALUES.leverageToken },
  })),
}));

// 4) Stub on-chain balance fetch
vi.mock("../../../../../statev3/common/queries/useFetchViewAssetBalance", () => ({
  useFetchViewAssetBalance: vi.fn(() => ({
    data: {
      balance: {
        bigIntValue: parseUnits(MOCK_VALUES.balance, MOCK_VALUES.leverageToken.tokenData.decimals),
        decimals: MOCK_VALUES.leverageToken.tokenData.decimals,
      },
    },
  })),
}));

// 5) Stub price fetch
vi.mock("../../../../../statev3/common/queries/useFetchViewAssetPrice", () => ({
  useFetchViewAssetPrice: vi.fn(() => ({ data: MOCK_VALUES.price })),
}));

// 6) Stub max-deposit lookup
vi.mock("../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit", () => ({
  useFetchViewMaxUserDeposit: vi.fn(() => ({ data: MOCK_VALUES.maxDeposit })),
}));

// 7) Stub deposit-shares preview
vi.mock("../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive", () => ({
  useFetchDepositSharesToReceive: vi.fn(() => ({
    data: { sharesToReceive: MOCK_VALUES.depositShares },
  })),
}));

// 8) Stub withdraw-assets preview
vi.mock("../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive", () => ({
  useFetchViewWithdrawSharesToReceive: vi.fn(() => ({
    data: { assetsToReceive: MOCK_VALUES.withdrawAssets },
  })),
}));

// 9) Stub debounce hook
vi.mock("../../../../../statev3/common/hooks/useWrappedDebounce", () => ({
  useWrappedDebounce: vi.fn((val: string) => ({ debouncedAmount: val })),
}));

vi.mock("../../../../../statev3/common/hooks/useAmountUsdValue", () => ({
  useAmountUsdValue: vi.fn((amount: string) => ({
    data: amount,
  })),
}));

vi.mock("../../../../../state/loop-strategy/hooks/useFetchWithdrawCostInUsdAndUnderlying", () => ({
  useFetchViewWithdrawCostInUsdAndUnderlying: vi.fn(() => ({
    data: {
      cost: {
        tokenAmount: {
          bigIntValue: parseUnits("1", MOCK_VALUES.leverageToken.tokenData.decimals),
          decimals: MOCK_VALUES.leverageToken.tokenData.decimals,
        },
        dollarAmount: {
          bigIntValue: parseUnits("1", MOCK_VALUES.leverageToken.tokenData.decimals),
          decimals: MOCK_VALUES.leverageToken.tokenData.decimals,
        },
      },
    },
  })),
}));

// 11) Stub the wallet-connect clearing hook with real clear-logic
vi.mock("../../../../../../shared/hooks/wallet-hooks/useClearIfExceedsBalance", () => ({
  useClearIfExceedsBalanceAfterWalletConnect: ({
    getValue,
    setValue,
    balance: { bigIntValue, decimals },
    isConnected,
  }: {
    getValue: () => string;
    setValue: (val: string) => void;
    balance: { bigIntValue: bigint; decimals: number };
    isConnected: boolean;
  }) => {
    if (isConnected) {
      const current = getValue();
      const numeric = parseFloat(current) || 0;
      const max = Number(bigIntValue) / 10 ** decimals;
      if (numeric > max) setValue("");
    }
  },
}));

describe("LeverageTokenFormProvider", () => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <LeverageTokenFormProvider>{children}</LeverageTokenFormProvider>
  );

  it("throws when context is used outside provider", () => {
    expect(() => renderHook(() => useLeverageTokenFormContext())).toThrow(
      /must be used within LeverageTokenFormProvider/
    );
  });

  it("provides default mode and allows switching", () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });
    expect(result.current.mode).toBe("deposit");

    act(() => result.current.setMode("withdraw"));
    expect(result.current.mode).toBe("withdraw");
  });

  it("resets amounts when switching modes", () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "10"));
    expect(result.current.depositAmount).toBe("10");

    act(() => result.current.setMode("withdraw"));
    expect(result.current.depositAmount).toBe("");
    expect(result.current.withdrawAmount).toBe("");
  });

  it("resets fields when selecting new token", () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "10"));
    act(() => result.current.setSelectedLeverageTokenAddress("0xNEW"));

    // still returns the same mock leverage token data
    expect(result.current.selectedLeverageToken.data?.address).toBe(MOCK_VALUES.leverageToken.address);
    expect(result.current.depositAmount).toBe("");
    expect(result.current.withdrawAmount).toBe("");
  });

  it("logs correct values on deposit submit", async () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "10"));
    await act(async () => result.current.formOnSubmitAsync({}));

    expect(spy).toHaveBeenCalledWith("formOnSubmitAsync", "10", MOCK_VALUES.depositShares);
  });

  it("logs correct values on withdraw submit", async () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    act(() => result.current.setMode("withdraw"));
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "4"));
    await act(async () => result.current.formOnSubmitAsync({}));

    expect(spy).toHaveBeenCalledWith("formOnSubmitAsync", "4", MOCK_VALUES.withdrawAssets);
  });

  it("preserves or clears depositAmount based on login and balance", () => {
    const mockUseAccount = vi.mocked(useAccount) as Mock;
    mockUseAccount.mockReturnValue({ address: undefined, isConnected: false });

    const { result, rerender } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // before login: can set arbitrarily
    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "200"));
    expect(result.current.depositAmount).toBe("200");

    // login: balance = 100, so 200 > 100 -> clears
    mockUseAccount.mockReturnValue({ address: MOCK_VALUES.userAddress, isConnected: true });
    rerender();
    expect(result.current.depositAmount).toBe("");

    // before login again
    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "50"));
    expect(result.current.depositAmount).toBe("50");

    // login: 50 <= 100 -> stays
    rerender();
    expect(result.current.depositAmount).toBe("50");
  });

  it("preserves or clears withdrawAmount based on login and lpBalance", () => {
    const mockUseAccount = vi.mocked(useAccount) as Mock;
    mockUseAccount.mockReturnValue({ address: undefined, isConnected: false });

    const { result, rerender } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // before login
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "200"));
    expect(result.current.withdrawAmount).toBe("200");

    // login: lpBalance = 100, so 200 > 100 -> clears
    mockUseAccount.mockReturnValue({ address: MOCK_VALUES.userAddress, isConnected: true });
    rerender();
    expect(result.current.withdrawAmount).toBe("");

    // before login again
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "50"));
    expect(result.current.withdrawAmount).toBe("50");

    // login: 50 <= 100 -> stays
    rerender();
    expect(result.current.withdrawAmount).toBe("50");
  });
});
