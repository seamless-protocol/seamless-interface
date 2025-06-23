import { createContext, useContext, useState, useCallback, ReactNode } from "react";
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
  useToken,
  ViewBigInt,
} from "@shared";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useWrappedDebounce } from "../../../../../data/common/hooks/useWrappedDebounce";
import { useFetchViewAssetBalance } from "../../../../../data/common/queries/useFetchViewAssetBalance";
import { useFetchCollateralAsset } from "../../../../../data/leverage-tokens/queries/CollateralAsset.all";
import { useMintLeverageToken } from "../../../../../data/leverage-tokens/mutations/useMintLeverageToken";
import { useRedeemLeverageToken } from "../../../../../data/leverage-tokens/mutations/useRedeemLeverageToken";
import {
  PreviewRedeemWithSwap,
  useFetchPreviewRedeemWithSwap,
} from "../../../../../data/leverage-tokens/hooks/useFetchPreviewRedeemWithSwap";
import { leverageRouterAddress } from "../../../../../generated";
import {
  PreviewMintWithSwapData,
  useFetchPreviewMintWithSwap,
} from "../../../../../data/leverage-tokens/hooks/useFetchPreviewMintWithSwap";
import {
  LimitStatus,
  useLeverageTokenLimitStatuses,
} from "../../../../../data/leverage-tokens/hooks/useLeverageTokenFormStatuses";

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

  previewMintData: Displayable<PreviewMintWithSwapData | undefined>;

  previewRedeemData: Displayable<PreviewRedeemWithSwap | undefined>;

  formOnSubmitAsync: (
    params: {
      from?: Address;
      receiver?: Address;
    },
    settings?: SeamlessWriteAsyncParams
  ) => Promise<void>;

  isMintDisabled: boolean;
  isRedeemDisabled: boolean;

  isMintLoading: boolean;
  isRedeemLoading: boolean;

  onTransaction?: () => void;
  setOnTransaction: (onTransaction?: () => void) => void;

  approveData: {
    isApproving: boolean;
    approveAsync: () => Promise<void>;
    isApproved: boolean;
    justApproved: boolean;
  };

  redeemApproveData: {
    isApproving: boolean;
    approveAsync: () => Promise<void>;
    isApproved: boolean;
    justApproved: boolean;
  };

  limitStatuses: Displayable<LimitStatus[] | undefined>;
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
  const { data: collateralAssetData } = useToken(collateralAsset);

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

  const limitStatuses = useLeverageTokenLimitStatuses({
    debouncedDepositAmount,
    selectedLeverageToken: selectedLeverageToken.data,
  });

  /* ------------- */
  /*   Approve     */
  /* ------------- */
  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    collateralAsset,
    leverageRouterAddress,
    collateralAssetData?.decimals ? parseUnits(depositAmount || "0", collateralAssetData?.decimals) : undefined
  );

  /* -------------------- */
  /*   Deposit Logic      */
  /* -------------------- */

  const previewMintData = useFetchPreviewMintWithSwap(selectedLeverageToken.data?.address, debouncedDepositAmount);

  /* -------------------- */
  /*   Withdraw Logic     */
  /* -------------------- */

  const previewRedeemData = useFetchPreviewRedeemWithSwap(selectedLeverageToken.data?.address, debouncedWithdrawAmount);

  const {
    isApproved: isRedeemApproved,
    isApproving: isRedeemApproving,
    justApproved: isRedeemJustApproved,
    approveAsync: redeemApproveAsync,
  } = useERC20Approve(
    selectedLeverageToken.data?.address,
    leverageRouterAddress,
    previewRedeemData.data?.previewRedeemData?.shares?.tokenAmount?.bigIntValue
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
            <Typography>You minted {debouncedDepositAmount}</Typography>
          </FlexCol>
        ),
      });
    },
    onError: (error) => {
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

  const { redeemAsync, isRedeemPending } = useRedeemLeverageToken({
    onSuccess: (txHash) => {
      showNotification({
        txHash,
        content: (
          <FlexCol className="w-full items-center text-center justify-center">
            You redeemed {debouncedWithdrawAmount}
          </FlexCol>
        ),
      });
    },
    onError: (error) => {
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

  const { showNotification } = useNotificationContext();

  const formOnSubmitAsync = async () => {
    if (mode === "deposit") {
      await mintAsync({
        leverageToken: selectedLeverageTokenAddress!,
        amount: previewMintData.data?.previewMint.equity.tokenAmount.bigIntValue,
        minShares: previewMintData.data?.previewMint.minShares.tokenAmount.bigIntValue,
        maxSwapCostInCollateral: previewMintData.data?.swapCost.tokenAmount.bigIntValue,
        swapContext: previewMintData.data?.swapContext,
      });
    } else if (mode === "withdraw") {
      await redeemAsync({
        leverageToken: selectedLeverageTokenAddress,
        equityInCollateral: previewRedeemData?.data?.equityAfterSwapCost.tokenAmount.bigIntValue,
        maxShares: previewRedeemData?.data?.previewRedeemData?.shares?.tokenAmount?.bigIntValue,
        maxSwapCostInCollateral: previewRedeemData?.data?.swapCost.tokenAmount.bigIntValue,
        swapContext: previewRedeemData?.data?.swapContext,
      });
    }
  };

  const isMintLoading = isMintPending || previewMintData.isLoading;
  const isRedeemLoading = isRedeemPending || previewRedeemData.isLoading;

  const isMintDisabled = limitStatuses.data.some((status) => status === "mintLimitExceeded") || previewMintData.isError;
  const isRedeemDisabled = previewRedeemData.isError;

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
          data: previewMintData.data,
          isLoading: previewMintData.isLoading,
          isFetched: previewMintData.isFetched,
        },
        onTransaction: _onTransaction,
        setOnTransaction,
        previewRedeemData: {
          data: previewRedeemData.data,
          isLoading: previewRedeemData.isLoading,
          isFetched: previewRedeemData.isFetched,
        },
        isMintLoading,
        isRedeemLoading,
        isMintDisabled,
        isRedeemDisabled,
        approveData: {
          isApproved,
          isApproving,
          justApproved,
          approveAsync,
        },
        redeemApproveData: {
          isApproved: isRedeemApproved,
          isApproving: isRedeemApproving,
          justApproved: isRedeemJustApproved,
          approveAsync: redeemApproveAsync,
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
        limitStatuses,
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
