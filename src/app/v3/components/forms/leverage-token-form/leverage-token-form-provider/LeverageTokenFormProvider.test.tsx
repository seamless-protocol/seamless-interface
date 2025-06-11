/**
 * @vitest-environment jsdom
 */
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { Mock } from "vitest";

import { LeverageTokenFormProvider, useLeverageTokenFormContext } from "./LeverageTokenFormProvider";
import { useAccount } from "wagmi";
import { Address, parseUnits } from "viem";

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
  useNotificationContext: () => ({
    showNotification: vi.fn(),
  }),
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
    isLoading: false,
    isFetched: true,
  })),
}));

// 4) Stub on-chain balance fetch (collateral + LP balance)
vi.mock("../../../../../statev3/common/queries/useFetchViewAssetBalance", () => ({
  useFetchViewAssetBalance: vi.fn(() => ({
    data: {
      balance: {
        bigIntValue: parseUnits(MOCK_VALUES.balance, MOCK_VALUES.leverageToken.tokenData.decimals),
        decimals: MOCK_VALUES.leverageToken.tokenData.decimals,
      },
    },
    isLoading: false,
    isFetched: true,
  })),
}));

// 5) Stub collateral-asset lookup
vi.mock("../../../../../statev3/queries/CollateralAsset.all", () => ({
  useFetchCollateralAsset: vi.fn(() => ({
    data: {
      address: MOCK_VALUES.leverageToken.underlyingAssetAddress,
      decimals: MOCK_VALUES.leverageToken.underlyingAsset.decimals,
      symbol: "MOCK",
    },
    isLoading: false,
    isFetched: true,
  })),
}));

// 6) Stub debounce hook
vi.mock("../../../../../statev3/common/hooks/useWrappedDebounce", () => ({
  useWrappedDebounce: vi.fn((val: string) => ({ debouncedAmount: val })),
}));

// 7) Stub preview-mint hook
vi.mock("../../../../../data/leverage-tokens/hooks/useFetchPreviewMintWithSwap", () => ({
  useFetchPreviewMintWithSwap: vi.fn(() => ({
    data: {
      previewMint: {
        equity: { tokenAmount: { bigIntValue: BigInt(MOCK_VALUES.depositShares) } },
        shares: { tokenAmount: { bigIntValue: BigInt(MOCK_VALUES.depositShares) } },
      },
      swapCost: { tokenAmount: { bigIntValue: 0n } },
      swapContext: null,
    },
    isLoading: false,
    isFetched: true,
  })),
}));

// 8) Stub preview-redeem hook
vi.mock("../../../../../data/leverage-tokens/hooks/useFetchPreviewRedeemWithSwap", () => ({
  useFetchPreviewRedeemWithSwap: vi.fn(() => ({
    data: {
      previewRedeemData: {
        shares: { tokenAmount: { bigIntValue: BigInt(MOCK_VALUES.withdrawAssets) } },
      },
      swapCost: { bigIntValue: 0n },
      equityAfterSwapCost: { tokenAmount: { bigIntValue: 0n }, dollarAmount: { bigIntValue: 0n } },
      swapContext: null,
    },
    isLoading: false,
    isFetched: true,
  })),
}));

// 9) Stub useMintLeverageToken
const mockMintAsync = vi.fn();
vi.mock("../../../../../statev3/leverage/mutations/useMintLeverageToken", () => ({
  useMintLeverageToken: () => ({
    mintAsync: mockMintAsync,
    isMintPending: false,
  }),
}));

// 10) Stub useRedeemLeverageToken
const mockRedeemAsync = vi.fn();
vi.mock("../../../../../statev3/leverage/mutations/useRedeemLeverageToken", () => ({
  useRedeemLeverageToken: () => ({
    redeemAsync: mockRedeemAsync,
  }),
}));

// 11) Stub the wallet-connect clearing hook
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

// 12) Stub useFetchViewAssetPrice
vi.mock("../../../../../statev3/common/queries/useFetchViewAssetPrice", () => ({
  useFetchViewAssetPrice: vi.fn(() => ({
    data: MOCK_VALUES.price,
    isLoading: false,
    isFetched: true,
  })),
}));

// 13) Stub useLeverageTokenLimitStatuses
vi.mock("../../../../../data/leverage-tokens/hooks/useLeverageTokenFormStatuses", () => ({
  useLeverageTokenLimitStatuses: vi.fn(() => ({
    data: [], // no warnings by default
    isLoading: false,
    isFetched: true,
    isError: false,
    error: undefined,
  })),
}));

// 14) Stub useFetchUserEquity
vi.mock("../../../../../data/leverage-tokens/queries/user-equity/user-equity.fetch.ts", () => ({
  useFetchUserEquity: vi.fn(() => ({
    data: {
      tokenAmount: {
        bigIntValue: parseUnits(MOCK_VALUES.lpBalance, MOCK_VALUES.leverageToken.underlyingAsset.decimals),
        decimals: MOCK_VALUES.leverageToken.underlyingAsset.decimals,
        symbol: "MOCK",
      },
      dollarAmount: {
        bigIntValue: 0n,
        decimals: MOCK_VALUES.leverageToken.tokenData.decimals,
        symbol: "MOCK",
      },
    },
    isLoading: false,
    isFetched: true,
    isError: false,
    error: undefined,
  })),
}));

describe("LeverageTokenFormProvider", () => {
  // We wrap with a defaultLeverageTokenAddress so that `selectedLeverageTokenAddress` is never undefined
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <LeverageTokenFormProvider defaultLeverageTokenAddress={MOCK_VALUES.leverageToken.address as Address}>
      {children}
    </LeverageTokenFormProvider>
  );

  beforeEach(() => {
    mockMintAsync.mockClear();
    mockRedeemAsync.mockClear();
    // Reset useAccount to the “logged-in” state by default
    (useAccount as Mock).mockReturnValue({
      address: MOCK_VALUES.userAddress,
      isConnected: true,
    });
  });

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

    // Switch to “withdraw” → both fields should clear
    act(() => result.current.setMode("withdraw"));
    expect(result.current.depositAmount).toBe("");
    expect(result.current.withdrawAmount).toBe("");
  });

  it("resets fields when selecting new token", () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // Set depositAmount to “10”
    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "10"));
    act(() => result.current.setSelectedLeverageTokenAddress("0xNEW"));

    // Even though we forced a new address, useFetchLeverageTokenByAddress always returns the same mock object
    expect(result.current.selectedLeverageToken.data?.address).toBe(MOCK_VALUES.leverageToken.address);

    // Both fields cleared
    expect(result.current.depositAmount).toBe("");
    expect(result.current.withdrawAmount).toBe("");
  });

  it("calls mintAsync with correct values on deposit submit", async () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // Fill in depositAmount
    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "10"));

    // Run formOnSubmitAsync
    await act(async () => result.current.formOnSubmitAsync({}));

    expect(mockMintAsync).toHaveBeenCalledTimes(1);
    expect(mockMintAsync).toHaveBeenCalledWith({
      leverageToken: MOCK_VALUES.leverageToken.address,
      amount: BigInt(MOCK_VALUES.depositShares),
      minShares: BigInt(MOCK_VALUES.depositShares),
      maxSwapCostInCollateral: 0n,
      swapContext: null,
    });
  });

  it("calls redeemAsync with correct values on withdraw submit", async () => {
    const { result } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // Switch to “withdraw” mode
    act(() => result.current.setMode("withdraw"));

    // Fill in withdrawAmount
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "4"));

    // Run formOnSubmitAsync
    await act(async () => result.current.formOnSubmitAsync({}));

    expect(mockRedeemAsync).toHaveBeenCalledTimes(1);
    expect(mockRedeemAsync).toHaveBeenCalledWith({
      leverageToken: MOCK_VALUES.leverageToken.address,
      equityInCollateral: BigInt(0),
      maxShares: BigInt(MOCK_VALUES.withdrawAssets),
      maxSwapCostInCollateral: 0n,
      swapContext: null,
    });
  });

  it("preserves or clears depositAmount based on login and balance", () => {
    const mockUseAccount = vi.mocked(useAccount) as Mock;

    // 1) Start “logged out”
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
    mockUseAccount.mockReturnValue({ address: undefined, isConnected: false });
    rerender();
    act(() => result.current.reactHookFormMethods.setValue("depositAmount", "50"));
    expect(result.current.depositAmount).toBe("50");

    // login: 50 <= 100 → stays
    mockUseAccount.mockReturnValue({ address: MOCK_VALUES.userAddress, isConnected: true });
    rerender();
    expect(result.current.depositAmount).toBe("50");
  });

  it("preserves or clears withdrawAmount based on login and lpBalance", () => {
    const mockUseAccount = vi.mocked(useAccount) as Mock;

    // before login
    mockUseAccount.mockReturnValue({ address: undefined, isConnected: false });

    const { result, rerender } = renderHook(() => useLeverageTokenFormContext(), { wrapper });

    // login: lpBalance = 100, so 200 > 100 → clears
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "200"));
    expect(result.current.withdrawAmount).toBe("200");

    // login: lpBalance = 100 → clears 200 > 100
    mockUseAccount.mockReturnValue({ address: MOCK_VALUES.userAddress, isConnected: true });
    rerender();
    expect(result.current.withdrawAmount).toBe("");

    // before login again
    mockUseAccount.mockReturnValue({ address: undefined, isConnected: false });
    rerender();
    act(() => result.current.reactHookFormMethods.setValue("withdrawAmount", "50"));
    expect(result.current.withdrawAmount).toBe("50");

    // login: 50 <= 100 → stays
    mockUseAccount.mockReturnValue({ address: MOCK_VALUES.userAddress, isConnected: true });
    rerender();
    expect(result.current.withdrawAmount).toBe("50");
  });
});
