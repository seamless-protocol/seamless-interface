import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

type IStrategyProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFWithdrawStrategyAmountField<T>({ ...other }: IStrategyProps<T>) {
  const { selectedLeverageToken, withdrawAmountUsdValue, balance: walletBalance } = useLeverageTokenFormContext();

  const { data: { tokenData, address } = {}, ...rest } = selectedLeverageToken;

  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={address}
      dollarValue={{
        ...withdrawAmountUsdValue,
      }}
      walletBalance={{
        ...walletBalance,
        data: walletBalance?.data.balance,
      }}
      protocolMaxValue={{
        ...walletBalance,
        data: walletBalance?.data.balance,
      }}
      tokenData={{ data: tokenData || {}, ...rest }}
    />
  );
}
