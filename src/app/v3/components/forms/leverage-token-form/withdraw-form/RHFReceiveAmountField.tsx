import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import { useFullTokenData } from "../../../../../data/common/meta-data-queries/useFullTokenData";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};

export function RHFReceiveAmountField<T>({ name, ...other }: IProps<T>) {
  const { selectedLeverageToken, previewRedeemData } = useLeverageTokenFormContext();

  const { data: leverageTokenData, ...leverageTokenRest } = useFullTokenData(selectedLeverageToken?.data?.address);

  return (
    <RHFAmountInputV3
      {...other}
      name={name as string}
      assetAddress={selectedLeverageToken?.data?.address}
      dollarValue={{
        data: previewRedeemData?.data?.previewRedeemData?.shares?.dollarAmount,
        isLoading: previewRedeemData?.isLoading,
        isFetched: true,
      }}
      value={previewRedeemData?.data?.previewRedeemData?.shares?.tokenAmount.value || "0"}
      disabled
      hideMaxButton
      tokenData={{ ...leverageTokenRest, data: leverageTokenData || {} }}
    />
  );
}
