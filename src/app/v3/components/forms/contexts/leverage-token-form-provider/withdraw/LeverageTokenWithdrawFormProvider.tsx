// --- contexts/leverage-token-form-provider/withdraw/LeverageTokenWithdrawFormProvider.tsx ---
import { createContext, ReactNode, useContext, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { Displayable, ViewBigInt, SeamlessWriteAsyncParams } from "../../../../../../../shared";
import { LeverageToken } from "../../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useFetchLeverageTokenByAddress } from "../../../../../../data/leverage-tokens/queries/leverage-token-by-address/FetchLeverageTokenByAddress";
import { useFetchViewAssetBalance } from "../../../../../../statev3/common/queries/useFetchViewAssetBalance";
import { useFetchViewAssetPrice } from "../../../../../../statev3/common/queries/useFetchViewAssetPrice";
import { useAmountUsdValue } from "../useAmountUsdValue";
import {
  useFetchViewWithdrawSharesToReceive,
  ViewPreviewWithdraw,
} from "../../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useWrappedDebounce } from "../../../../../../statev3/common/hooks/useWrappedDebounce";

// ----- Withdraw Provider -----
export interface WithdrawFormData {
  amount: string;
}

interface LeverageTokenWithdrawContextValue {
  userAddress?: Address;
  selectedLeverageToken: Displayable<LeverageToken | undefined>;
  setSelectedLeverageTokenAddress: (address: Address) => void;
  methods: UseFormReturn<WithdrawFormData>;
  amount: string;
  debouncedAmount: string;

  // USD value of entered amount
  amountUsdValue: Displayable<ViewBigInt>;

  // wallet or protocol balance
  balance: Displayable<{ balance: ViewBigInt }>;
  assetPrice: Displayable<ViewBigInt>;

  // how much underlying token receives on withdraw
  sharesToReceive: Displayable<ViewPreviewWithdraw>;

  formOnSubmitAsync: (
    params: { shares?: bigint; from: string; receiver: string; previewWithdrawData: ViewPreviewWithdraw },
    settings?: SeamlessWriteAsyncParams
  ) => Promise<void>;
  isPending: boolean;
  onTransaction?: () => void;
}

const LeverageTokenWithdrawContext = createContext<LeverageTokenWithdrawContextValue | undefined>(undefined);

interface LeverageTokenWithdrawProviderProps {
  children: ReactNode;
  defaultLeverageTokenAddress?: Address;
  onTransaction?: () => void;
}

export function LeverageTokenWithdrawFormProvider({
  defaultLeverageTokenAddress,
  onTransaction,
  children,
}: LeverageTokenWithdrawProviderProps) {
  const methods = useForm<WithdrawFormData>({ defaultValues: { amount: "" } });
  const { watch } = methods;
  const amount = watch("amount", "");

  const { address: userAddress } = useAccount();
  const [selectedLeverageTokenAddress, setSelectedLeverageTokenAddress] = useState<Address | undefined>(
    defaultLeverageTokenAddress
  );

  const selectedLeverageToken = useFetchLeverageTokenByAddress(selectedLeverageTokenAddress);

  const { data: { underlyingAssetAddress, underlyingAsset } = {} } = selectedLeverageToken;

  const balance = useFetchViewAssetBalance(underlyingAssetAddress);
  const assetPrice = useFetchViewAssetPrice({ underlyingAsset: underlyingAssetAddress });

  // compute USD value via shared hook
  const amountUsdValue = useAmountUsdValue(amount, assetPrice, underlyingAsset?.decimals);

  // preview withdraw shares to receive
  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice?.data?.bigIntValue, 500);

  // compute receive amounts and their USD value
  const sharesToReceive = useFetchViewWithdrawSharesToReceive(debouncedAmount, selectedLeverageToken?.data?.address);

  const formOnSubmitAsync = async (
    {
      shares,
      from,
      receiver,
      previewWithdrawData,
    }: { shares?: bigint; from: string; receiver: string; previewWithdrawData: ViewPreviewWithdraw },
    settings?: SeamlessWriteAsyncParams
  ) => {
    // implement actual withdraw logic here
    // eslint-disable-next-line no-console
    console.log("formOnSubmitAsync", shares, from, receiver, previewWithdrawData, settings);
  };

  return (
    <LeverageTokenWithdrawContext.Provider
      value={{
        userAddress,
        selectedLeverageToken,
        setSelectedLeverageTokenAddress,
        methods,
        amount,
        balance,
        assetPrice,
        amountUsdValue,
        sharesToReceive,
        formOnSubmitAsync,
        isPending: false,
        debouncedAmount,
        onTransaction,
      }}
    >
      {children}
    </LeverageTokenWithdrawContext.Provider>
  );
}

export function useLeverageTokenWithdrawFormContext() {
  const ctx = useContext(LeverageTokenWithdrawContext);
  if (!ctx)
    throw new Error("useLeverageTokenWithdrawFormContext must be used within LeverageTokenWithdrawFormProvider");
  return ctx;
}
