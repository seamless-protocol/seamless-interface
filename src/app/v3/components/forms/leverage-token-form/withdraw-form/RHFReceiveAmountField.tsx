import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFReceiveAmountField<T>({ name, ...other }: IProps<T>) {
  const { selectedLeverageToken, withdrawAmountUsdValue, sharesToReceiveWithdrawData } = useLeverageTokenFormContext();

  const { data: { underlyingAssetAddress, underlyingAsset } = {}, ...restTokenData } = selectedLeverageToken;

  return (
    <RHFAmountInputV3
      {...other}
      name={name as string}
      assetAddress={underlyingAssetAddress}
      dollarValue={withdrawAmountUsdValue}
      value={sharesToReceiveWithdrawData?.data?.assetsToReceive.tokenAmount.value || "0"}
      disabled
      hideMaxButton
      tokenData={{ ...restTokenData, data: underlyingAsset || {} }}
    />
  );
}
