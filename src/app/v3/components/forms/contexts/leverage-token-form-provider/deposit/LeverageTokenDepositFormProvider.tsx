import { createContext, useContext, useState, ReactNode } from "react";
import { useAccount } from "wagmi";
import { type Address } from "viem";
import { Displayable, FetchData, SeamlessWriteAsyncParams, ViewBigInt } from "@shared";
import { LeverageToken } from "../../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useFetchViewAssetPrice } from "../../../../../../statev3/common/queries/useFetchViewAssetPrice";
import { useFetchViewAssetBalance } from "../../../../../../statev3/common/queries/useFetchViewAssetBalance";
import { ViewAssetBalance } from "../../../../../../statev3/common/types/ViewAssetBalance";
import { useForm, UseFormReturn } from "react-hook-form";
import { useWrappedDebounce } from "../../../../../../statev3/common/hooks/useWrappedDebounce";
import {
  SharesToReceiveData,
  useFetchDepositSharesToReceive,
} from "../../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { useFetchViewMaxUserDeposit } from "../../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import { useReceiveAmounts } from "./useReceiveAmounts";
import { useAmountUsdValue } from "../useAmountUsdValue";

// ----- Deposit Provider -----
export interface DepositFormData {
  amount: string;
  receiveAmount: string;
}

interface LeverageTokenDepositContextValue {
  userAddress?: Address;
  selectedLeverageToken: Displayable<LeverageToken | undefined>;
  setSelectedLeverageTokenAddress: (address: Address) => void;
  methods: UseFormReturn<DepositFormData>;
  amount: string;
  debouncedAmount: string;
  balance: Displayable<ViewAssetBalance>;
  assetPrice: Displayable<ViewBigInt>;
  formOnSubmitAsync: (
    params: { amount?: bigint; previewDepositData: any },
    settings?: SeamlessWriteAsyncParams
  ) => Promise<void>;
  isPending: boolean;
  onTransaction?: () => void;
  amountUsdValue: Displayable<ViewBigInt>;
  maxUserDepositData: Displayable<ViewBigInt>;

  receiveAmount: string;
  receiveAmountUsdValue: Displayable<ViewBigInt>;

  previewDepositData: FetchData<SharesToReceiveData>;
}

const LeverageTokenDepositContext = createContext<LeverageTokenDepositContextValue | undefined>(undefined);

interface LeverageTokenDepositProviderProps {
  children: ReactNode;
  defaultLeverageTokenAddress?: Address;
  onTransaction?: () => void;
}

export function LeverageTokenDepositFormProvider({
  defaultLeverageTokenAddress,
  onTransaction,
  children,
}: LeverageTokenDepositProviderProps) {
  const methods = useForm<DepositFormData>({
    defaultValues: { amount: "", receiveAmount: "" },
  });
  const { watch } = methods;
  const amount = watch("amount", "");

  const { address: userAddress } = useAccount();
  const [selectedLeverageTokenAddress, setSelectedLeverageTokenAddress] = useState<Address | undefined>(
    defaultLeverageTokenAddress
  );

  const selectedLeverageToken = useFetchLeverageTokenByAddress(selectedLeverageTokenAddress);

  const balance = useFetchViewAssetBalance(selectedLeverageToken.data?.address);
  const assetPrice = useFetchViewAssetPrice({
    asset: selectedLeverageToken.data?.address,
  });

  // Deposit-specific logic
  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice.data?.bigIntValue, 500);
  const maxUserDepositData = useFetchViewMaxUserDeposit(selectedLeverageToken?.data?.address);
  const previewDepositData = useFetchDepositSharesToReceive(debouncedAmount, selectedLeverageToken.data?.address);

  // const { mutateAsync: depositAsync, isLoading: isDepositPending } = useMutateLeverageTokenDeposit(
  //   selectedLeverageToken.data?.address
  // );

  const formOnSubmitAsync = async ({ amount, settings }: { amount?: bigint; settings?: SeamlessWriteAsyncParams }) => {
    // eslint-disable-next-line no-console
    console.log("formOnSubmitAsync", amount, settings);
  };

  // compute derived values via hooks
  const underlyingDecimals = selectedLeverageToken.data?.underlyingAsset.decimals;
  const amountUsdValue = useAmountUsdValue(amount, assetPrice, underlyingDecimals);
  const { receiveAmount, receiveAmountUsdValue } = useReceiveAmounts(previewDepositData, assetPrice);

  return (
    <LeverageTokenDepositContext.Provider
      value={{
        userAddress,
        selectedLeverageToken,
        setSelectedLeverageTokenAddress,
        methods,
        amount,
        debouncedAmount,
        previewDepositData,
        balance,
        assetPrice,
        formOnSubmitAsync,
        isPending: false,
        amountUsdValue,
        maxUserDepositData,

        receiveAmount,
        receiveAmountUsdValue,
        onTransaction,
      }}
    >
      {children}
    </LeverageTokenDepositContext.Provider>
  );
}

export function useLeverageTokenDepositFormContext() {
  const ctx = useContext(LeverageTokenDepositContext);
  if (!ctx) throw new Error("useLeverageTokenDepositFormContext must be used within LeverageTokenDepositFormProvider");
  return ctx;
}
