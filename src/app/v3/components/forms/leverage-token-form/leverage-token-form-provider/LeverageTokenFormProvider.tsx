import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAccount } from "wagmi";
import { parseUnits, type Address } from "viem";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Displayable,
  FetchData,
  FlexCol,
  formatFetchBigIntToViewBigInt,
  SeamlessWriteAsyncParams,
  Typography,
  useERC20Approve,
  useNotificationContext,
  ViewBigInt,
} from "@shared";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useWrappedDebounce } from "../../../../../statev3/common/hooks/useWrappedDebounce";
import { useFetchViewAssetBalance } from "../../../../../statev3/common/queries/useFetchViewAssetBalance";
import { useFetchViewAssetPrice } from "../../../../../statev3/common/queries/useFetchViewAssetPrice";
import { useClearIfExceedsBalanceAfterWalletConnect } from "../../../../../../shared/hooks/wallet-hooks/useClearIfExceedsBalance";
import { useFetchCollateralAsset } from "../../../../../statev3/queries/CollateralAsset.all";
import { useFetchDebtAsset } from "../../../../../statev3/queries/DebtAsset.all";
import { useFetchPreviewMint } from "../../../../../state/leverage/useFetchPreviewMint";
import { etherFiLeverageRouterAddress } from "../../../../../generated";
import { useMintLeverageToken } from "../../../../../statev3/leverage/mutations/useMintLeverageToken";
import { useFetchPreviewRedeemWithSwap } from "../../../../../state/leverage/useFetchPreviewRedeemWithSwap";
import { useRedeemLeverageToken } from "../../../../../statev3/leverage/mutations/useRedeemLeverageToken";
import { SharesToReceiveData } from "../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import {
  PreviewWithdraw,
  ViewPreviewWithdraw,
} from "../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";

/* -------------------- */
/*   Types & Context    */
/* -------------------- */
export type Mode = "deposit" | "withdraw";

export interface LeverageTokenFormData {
  depositAmount: string;
  withdrawAmount: string;
}

interface LeverageTokenFormContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;

  selectedLeverageToken: Displayable<LeverageToken | undefined>;
  setSelectedLeverageTokenAddress: (address: Address) => void;

  reactHookFormMethods: UseFormReturn<LeverageTokenFormData>;
  depositAmount: string;
  withdrawAmount: string;

  debouncedDepositAmount: string;
  debouncedWithdrawAmount: string;

  balance: Displayable<{ balance: ViewBigInt }>;
  lpBalance: Displayable<{ balance: ViewBigInt }>;

  lpAssetPrice: Displayable<ViewBigInt>;

  depositAmountUsdValue: Displayable<ViewBigInt>;
  withdrawAmountUsdValue: Displayable<ViewBigInt>;

  maxUserDepositData: Displayable<ViewBigInt>;
  previewDepositData: FetchData<SharesToReceiveData>;

  sharesToReceiveWithdrawData: Displayable<ViewPreviewWithdraw>;

  formOnSubmitAsync: (
    params: {
      from?: Address;
      receiver?: Address;
    },
    settings?: SeamlessWriteAsyncParams
  ) => Promise<void>;

  isPending: boolean;

  isMintPending: boolean;

  onTransaction?: () => void;
  setOnTransaction: (onTransaction?: () => void) => void;

  withdrawCostInUsdAndUnderlying: Displayable<PreviewWithdraw>;

  approveData: {
    isApproving: boolean;
    approveAsync: () => Promise<void>;
    isApproved: boolean;
    justApproved: boolean;
  };
}

const LeverageTokenFormContext = createContext<LeverageTokenFormContextValue | undefined>(undefined);

/* -------------------- */
/*   Provider Props     */
/* -------------------- */
interface LeverageTokenFormProviderProps {
  children: ReactNode;
  defaultLeverageTokenAddress?: Address;
  defaultMode?: Mode;
  onTransaction?: () => void;
}

export function LeverageTokenFormProvider({
  children,
  defaultLeverageTokenAddress,
  defaultMode = "deposit",
  onTransaction,
}: LeverageTokenFormProviderProps) {
  /* -------------------- */
  /*   Local State        */
  /* -------------------- */
  const { isConnected } = useAccount();
  const [mode, _setMode] = useState<Mode>(defaultMode);
  const reactHookFormMethods = useForm<LeverageTokenFormData>({
    defaultValues: { depositAmount: "", withdrawAmount: "" },
  });
  const [_onTransaction, setOnTransaction] = useState(() => onTransaction);
  const { watch, reset } = reactHookFormMethods;
  const depositAmount = watch("depositAmount", "");
  const withdrawAmount = watch("withdrawAmount", "");

  const [selectedLeverageTokenAddress, _setSelectedLeverageTokenAddress] = useState<Address | undefined>(
    defaultLeverageTokenAddress
  );

  const { data: collateralAsset } = useFetchCollateralAsset(selectedLeverageTokenAddress);

  const { data: debtAsset } = useFetchDebtAsset(selectedLeverageTokenAddress);

  /* -------------------- */
  /*   Query Hooks        */
  /* -------------------- */
  const selectedLeverageToken = useFetchLeverageTokenByAddress(selectedLeverageTokenAddress);
  const balance = useFetchViewAssetBalance(collateralAsset);
  const lpBalance = useFetchViewAssetBalance(selectedLeverageTokenAddress);

  /* -------------------- */
  /*   Calculations       */
  /* -------------------- */
  const { debouncedAmount: debouncedDepositAmount } = useWrappedDebounce(depositAmount);
  const { debouncedAmount: debouncedWithdrawAmount } = useWrappedDebounce(withdrawAmount);

  useClearIfExceedsBalanceAfterWalletConnect({
    getValue: () => reactHookFormMethods.getValues("depositAmount"),
    setValue: (value) => reactHookFormMethods.setValue("depositAmount", value),
    balance: { bigIntValue: balance.data?.balance?.bigIntValue, decimals: balance.data?.balance?.decimals },
    isConnected,
  });
  useClearIfExceedsBalanceAfterWalletConnect({
    getValue: () => reactHookFormMethods.getValues("withdrawAmount"),
    setValue: (value) => reactHookFormMethods.setValue("withdrawAmount", value),
    balance: { bigIntValue: lpBalance.data?.balance?.bigIntValue, decimals: lpBalance.data?.balance?.decimals },
    isConnected,
  });

  /* ------------- */
  /*   Approve     */
  /* ------------- */
  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    collateralAsset,
    etherFiLeverageRouterAddress,
    parseUnits(depositAmount || "0", 18)
  );

  /* -------------------- */
  /*   Deposit Logic      */
  /* -------------------- */

  const previewMintData = useFetchPreviewMint(selectedLeverageToken.data?.address, debouncedDepositAmount);

  /* -------------------- */
  /*   Withdraw Logic     */
  /* -------------------- */

  const previewRedeemWithSwapData = useFetchPreviewRedeemWithSwap(
    selectedLeverageToken.data?.address,
    debouncedWithdrawAmount
  );

  /* -------------------- */
  /*   Handlers           */
  /* -------------------- */
  const resetFormsData = useCallback(() => {
    reset();
  }, [reset]);

  const setMode = useCallback(
    (mode: Mode) => {
      _setMode(mode);
      resetFormsData();
    },
    [_setMode, resetFormsData]
  );

  const setSelectedLeverageTokenAddress = useCallback(
    (address: Address) => {
      _setSelectedLeverageTokenAddress(address);
      resetFormsData();
    },
    [_setSelectedLeverageTokenAddress, resetFormsData]
  );

  const { mintAsync, isMintPending } = useMintLeverageToken();

  const { redeemAsync, isRedeemPending } = useRedeemLeverageToken();

  const { showNotification } = useNotificationContext();

  const formOnSubmitAsync = async () => {
    if (mode === "deposit") {
      if (!previewMintData.data) return;

      await mintAsync(
        {
          leverageToken: selectedLeverageTokenAddress!,
          amount: previewMintData.data.equity,
          minShares: previewMintData.data?.shares / 2n,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>You deposited {debouncedDepositAmount}</Typography>
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            onTransaction?.();
            reset();
          },
        }
      );
    } else if (mode === "withdraw") {
      if (!previewRedeemWithSwapData.data) return;

      await redeemAsync(
        {
          leverageToken: selectedLeverageTokenAddress!,
          equityInCollateral: previewRedeemWithSwapData.data.equityAfterSwapCost,
          maxShares: previewRedeemWithSwapData.data.previewRedeemData.shares,
          maxSwapCostInCollateral: previewRedeemWithSwapData.data.swapCost + 1n,
          swapContext: previewRedeemWithSwapData.data.swapContext,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>You withdrew {debouncedWithdrawAmount}</Typography>
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            onTransaction?.();
            reset();
          },
        }
      );
    }
  };

  const isPending = false; // todo

  const previewDepositData = {
    data: {
      sharesToReceive: {
        bigIntValue: previewMintData.data?.shares || 0n,
        decimals: 18,
        symbol: "shares",
      },
      sharesToReceiveInUsd: {
        bigIntValue: previewMintData.data?.shares || 0n,
        decimals: 18,
        symbol: "shares",
      },
    },
    isLoading: previewMintData.isLoading,
    isFetched: previewMintData.isFetched,
  };
  const sharesToReceiveWithdrawData = {
    data: {
      assetsToReceive: {
        tokenAmount: {
          bigIntValue: previewRedeemWithSwapData.data?.previewRedeemData.shares || 0n,
          decimals: 18,
          symbol: "shares",
        },
        dollarAmount: {
          bigIntValue: previewRedeemWithSwapData.data?.previewRedeemData.shares || 0n,
          decimals: 18,
          symbol: "shares",
        },
      },
    },
    isLoading: previewRedeemWithSwapData.isLoading,
    isFetched: previewRedeemWithSwapData.isFetched,
  };

  const depositAmountUsdValue = {
    data: {
      value: "0",
      decimals: 8,
      symbol: "$",
      viewValue: "0",
    },
    isLoading: false,
    isFetched: true,
  };

  const withdrawCostInUsdAndUnderlying = {
    data: {
      assetsToReceive: {
        bigIntValue: previewRedeemWithSwapData.data?.previewRedeemData.shares || 0n,
        decimals: 18,
        symbol: "shares",
      },
      assetsToReceiveInUsd: {
        bigIntValue: previewRedeemWithSwapData.data?.previewRedeemData.shares || 0n,
        decimals: 18,
        symbol: "shares",
      },
    },
    isLoading: false,
    isFetched: true,
  };

  /* -------------------- */
  /*   Return Context     */
  /* -------------------- */
  return (
    <LeverageTokenFormContext.Provider
      value={{
        mode,
        setMode,
        selectedLeverageToken,
        setSelectedLeverageTokenAddress,
        reactHookFormMethods,
        depositAmount,
        withdrawAmount,
        debouncedDepositAmount,
        debouncedWithdrawAmount,
        balance,
        lpBalance,
        formOnSubmitAsync,
        isMintPending,
        onTransaction: _onTransaction,
        setOnTransaction,
        depositAmountUsdValue,
        withdrawCostInUsdAndUnderlying,
        withdrawAmountUsdValue: depositAmountUsdValue,
        maxUserDepositData: depositAmountUsdValue,
        previewDepositData,
        sharesToReceiveWithdrawData,
        isPending,

        approveData: {
          isApproved,
          isApproving,
          justApproved,
          approveAsync,
        },
        lpAssetPrice: {
          isLoading: false,
          isFetched: true,
          data: {
            value: "0",
            decimals: 8,
            symbol: "$",
            viewValue: "0",
          },
        },
      }}
    >
      {children}
    </LeverageTokenFormContext.Provider>
  );
}

export function useLeverageTokenFormContext() {
  const ctx = useContext(LeverageTokenFormContext);
  if (!ctx) throw new Error("useLeverageTokenFormContext must be used within LeverageTokenFormProvider");
  return ctx;
}
