import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenWithdrawFormContext } from "../contexts/leverage-token-form-provider/withdraw/LeverageTokenWithdrawFormProvider";

type IStrategyProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFWithdrawStrategyAmountField<T>({ ...other }: IStrategyProps<T>) {
  const { selectedLeverageToken, amountUsdValue, balance: walletBalance } = useLeverageTokenWithdrawFormContext();

  const { data: { tokenData, address } = {}, ...rest } = selectedLeverageToken;

  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={address}
      dollarValue={{
        ...amountUsdValue,
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
