import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenWithdrawFormContext } from "../contexts/leverage-token-form-provider/withdraw/LeverageTokenWithdrawFormProvider";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFReceiveAmountField<T>({ name, ...other }: IProps<T>) {
  const { selectedLeverageToken, amountUsdValue, sharesToReceive } = useLeverageTokenWithdrawFormContext();

  const { data: { underlyingAssetAddress, underlyingAsset } = {}, ...restTokenData } = selectedLeverageToken;

  return (
    <RHFAmountInputV3
      {...other}
      name={name as string}
      assetAddress={underlyingAssetAddress}
      dollarValue={amountUsdValue}
      value={sharesToReceive?.data?.assetsToReceive.tokenAmount.value || "0"}
      disabled
      hideMaxButton
      tokenData={{ ...restTokenData, data: underlyingAsset || {} }}
    />
  );
}
