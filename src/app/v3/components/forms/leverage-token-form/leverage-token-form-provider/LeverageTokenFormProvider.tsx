import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAccount } from "wagmi";
import { parseUnits, type Address } from "viem";
import { useForm, UseFormReturn } from "react-hook-form";
import { Displayable, FetchData, SeamlessWriteAsyncParams, useERC20Approve, ViewBigInt } from "@shared";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import {
  SharesToReceiveData,
  useFetchDepositSharesToReceive,
} from "../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { useFetchViewMaxUserDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import {
  ViewPreviewWithdraw,
  useFetchViewWithdrawSharesToReceive,
} from "../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useWrappedDebounce } from "../../../../../statev3/common/hooks/useWrappedDebounce";
import { useFetchViewAssetBalance } from "../../../../../statev3/common/queries/useFetchViewAssetBalance";
import { useFetchViewAssetPrice } from "../../../../../statev3/common/queries/useFetchViewAssetPrice";
import { useClearIfExceedsBalanceAfterWalletConnect } from "../../../../../../shared/hooks/wallet-hooks/useClearIfExceedsBalance";
import { useAmountUsdValue } from "../../../../../statev3/common/hooks/useAmountUsdValue";

/* -------------------- */
/*   Types & Context    */
/* -------------------- */
export type Mode = "deposit" | "withdraw";

export interface LeverageTokenFormData {
  depositAmount: string;
  withdrawAmount: string;
}

interface LeverageTokenFormContextValue {
  userAddress?: Address;
  mode: Mode;
  setMode: (mode: Mode) => void;

  selectedLeverageToken: Displayable<LeverageToken | undefined>;
  setSelectedLeverageTokenAddress: (address: Address) => void;

  methods: UseFormReturn<LeverageTokenFormData>;
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
  onTransaction?: () => void;
  setOnTransaction: (onTransaction?: () => void) => void;

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
  const methods = useForm<LeverageTokenFormData>({
    defaultValues: { depositAmount: "", withdrawAmount: "" },
  });
  const [_onTransaction, setOnTransaction] = useState(() => onTransaction);
  const { watch, reset } = methods;
  const depositAmount = watch("depositAmount", "");
  const withdrawAmount = watch("withdrawAmount", "");

  const [selectedLeverageTokenAddress, _setSelectedLeverageTokenAddress] = useState<Address | undefined>(
    defaultLeverageTokenAddress
  );

  /* -------------------- */
  /*   Query Hooks        */
  /* -------------------- */
  const selectedLeverageToken = useFetchLeverageTokenByAddress(selectedLeverageTokenAddress);
  const balance = useFetchViewAssetBalance(selectedLeverageToken.data?.underlyingAssetAddress);
  const lpBalance = useFetchViewAssetBalance(selectedLeverageToken.data?.address);
  const lpAssetPrice = useFetchViewAssetPrice({
    asset: selectedLeverageToken.data?.address,
  });
  const underlyingAssetPrice = useFetchViewAssetPrice({
    asset: selectedLeverageToken.data?.underlyingAssetAddress,
  });

  /* -------------------- */
  /*   Calculations       */
  /* -------------------- */
  const { debouncedAmount: debouncedDepositAmount } = useWrappedDebounce(depositAmount);
  const { debouncedAmount: debouncedWithdrawAmount } = useWrappedDebounce(withdrawAmount);

  const depositAmountUsdValue = useAmountUsdValue(
    depositAmount,
    lpAssetPrice,
    selectedLeverageToken.data?.tokenData.decimals
  );
  const withdrawAmountUsdValue = useAmountUsdValue(
    withdrawAmount,
    underlyingAssetPrice,
    selectedLeverageToken.data?.underlyingAsset.decimals
  );

  useClearIfExceedsBalanceAfterWalletConnect({
    getValue: () => methods.getValues("depositAmount"),
    setValue: (value) => methods.setValue("depositAmount", value),
    balance: { bigIntValue: balance.data?.balance?.bigIntValue, decimals: balance.data?.balance?.decimals },
    isConnected,
  });
  useClearIfExceedsBalanceAfterWalletConnect({
    getValue: () => methods.getValues("withdrawAmount"),
    setValue: (value) => methods.setValue("withdrawAmount", value),
    balance: { bigIntValue: lpBalance.data?.balance?.bigIntValue, decimals: lpBalance.data?.balance?.decimals },
    isConnected,
  });

  /* ------------- */
  /*   Approve     */
  /* ------------- */
  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    selectedLeverageToken.data?.underlyingAssetAddress,
    selectedLeverageToken.data?.address,
    selectedLeverageToken.data?.underlyingAsset.decimals
      ? parseUnits(depositAmount || "0", selectedLeverageToken.data?.underlyingAsset.decimals)
      : undefined
  );

  /* -------------------- */
  /*   Deposit Logic      */
  /* -------------------- */
  const maxUserDepositData = useFetchViewMaxUserDeposit(selectedLeverageToken.data?.address);
  const previewDepositData = useFetchDepositSharesToReceive(
    debouncedDepositAmount,
    selectedLeverageToken.data?.address
  );

  /* -------------------- */
  /*   Withdraw Logic     */
  /* -------------------- */
  const sharesToReceiveWithdrawData = useFetchViewWithdrawSharesToReceive(
    debouncedWithdrawAmount,
    selectedLeverageToken.data?.address
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

  const formOnSubmitAsync = async () => {
    if (mode === "deposit") {
      if (!previewDepositData) return;
      const { sharesToReceive: shares } = previewDepositData.data;
      // eslint-disable-next-line no-console
      console.log("formOnSubmitAsync", depositAmount, shares);
    } else if (mode === "withdraw") {
      const { assetsToReceive } = sharesToReceiveWithdrawData.data;
      // eslint-disable-next-line no-console
      console.log("formOnSubmitAsync", withdrawAmount, assetsToReceive);
    }
  };

  const isPending = false; // todo

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
        methods,
        depositAmount,
        withdrawAmount,
        debouncedDepositAmount,
        debouncedWithdrawAmount,
        balance,
        lpBalance,
        lpAssetPrice,
        depositAmountUsdValue,
        withdrawAmountUsdValue,
        maxUserDepositData,
        previewDepositData,
        sharesToReceiveWithdrawData,
        formOnSubmitAsync,
        isPending,
        onTransaction: _onTransaction,
        setOnTransaction,
        approveData: {
          isApproved,
          isApproving,
          justApproved,
          approveAsync,
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
