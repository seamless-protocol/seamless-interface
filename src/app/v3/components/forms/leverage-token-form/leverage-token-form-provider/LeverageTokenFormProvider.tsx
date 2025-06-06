import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAccount } from "wagmi";
import { parseUnits, type Address } from "viem";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Displayable,
  FlexCol,
  getParsedError,
  SeamlessWriteAsyncParams,
  Typography,
  useERC20Approve,
  useNotificationContext,
  ViewBigInt,
} from "@shared";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/mockLeverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useWrappedDebounce } from "../../../../../statev3/common/hooks/useWrappedDebounce";
import { useFetchViewAssetBalance } from "../../../../../statev3/common/queries/useFetchViewAssetBalance";
import { useClearIfExceedsBalanceAfterWalletConnect } from "../../../../../../shared/hooks/wallet-hooks/useClearIfExceedsBalance";
import { useFetchCollateralAsset } from "../../../../../statev3/queries/CollateralAsset.all";
import { PreviewMintData } from "../../../../../data/leverage-tokens/hooks/useFetchPreviewMint";
import { useMintLeverageToken } from "../../../../../statev3/leverage/mutations/useMintLeverageToken";
import { useRedeemLeverageToken } from "../../../../../statev3/leverage/mutations/useRedeemLeverageToken";
import {
  PreviewWithdraw,
  ViewPreviewWithdraw,
} from "../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import {
  SwapContext,
  useFetchPreviewRedeemWithSwap,
} from "../../../../../data/leverage-tokens/hooks/useFetchPreviewRedeemWithSwap";
import { leverageRouterAddress } from "../../../../../generated";
import { useFetchPreviewMintWithSwap } from "../../../../../data/leverage-tokens/hooks/useFetchPreviewMintWithSwap";

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

  withdrawAmountUsdValue: Displayable<ViewBigInt>;

  maxUserDepositData: Displayable<ViewBigInt>;

  sharesToReceiveWithdrawData: Displayable<ViewPreviewWithdraw>;

  previewMintData: Displayable<PreviewMintData | undefined>;

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
    leverageRouterAddress,
    parseUnits(depositAmount || "0", 18)
  );

  /* -------------------- */
  /*   Deposit Logic      */
  /* -------------------- */

  const previewMintData = useFetchPreviewMintWithSwap(selectedLeverageToken.data?.address, debouncedDepositAmount);

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

  const { mintAsync, isMintPending } = useMintLeverageToken({
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
    onError: (error: any) => {
      showNotification({
        status: "error",
        content: `Failed to mint: ${getParsedError(error)}`,
      });
    },
    onSettled: () => {
      onTransaction?.();
      reset();
    },
  });

  const { redeemAsync } = useRedeemLeverageToken();

  const { showNotification } = useNotificationContext();

  const formOnSubmitAsync = async () => {
    if (mode === "deposit") {
      if (!previewMintData.data) return;

      await mintAsync({
        leverageToken: selectedLeverageTokenAddress!,
        amount: previewMintData.data.previewMint.equity.tokenAmount.bigIntValue,
        minShares: previewMintData.data?.previewMint.shares.tokenAmount.bigIntValue,
        swapContext: previewMintData.data?.swapContext,
      });
    } else if (mode === "withdraw") {
      await redeemAsync({
        leverageToken: selectedLeverageTokenAddress,
        equityInCollateral: previewRedeemWithSwapData?.data?.equityAfterSwapCost,
        maxShares: previewRedeemWithSwapData?.data?.previewRedeemData?.shares,
        maxSwapCostInCollateral: previewRedeemWithSwapData?.data?.swapCost,
        swapContext: previewRedeemWithSwapData?.data?.swapContext as SwapContext,
      });
    }
  };

  const isPending = isMintPending;

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

  const withdrawAmountUsdValue = {
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
        previewMintData: {
          data: previewMintData.data?.previewMint,
          isLoading: previewMintData.isLoading,
          isFetched: previewMintData.isFetched,
        },
        isMintPending,
        onTransaction: _onTransaction,
        setOnTransaction,
        withdrawCostInUsdAndUnderlying,
        withdrawAmountUsdValue,
        maxUserDepositData: {
          data: {
            bigIntValue: 10000000000000000000000000n,
            decimals: 18,
            symbol: "shares",
          },
          isLoading: false,
          isFetched: true,
        },
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
