import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};
/**
 * `RHFReceiveAmountField` Component Documentation

 * ## Usage Example:
 * ```jsx
 * <RHFReceiveAmountField
 *   name="expectedShares"
 * />
 * ```
 * This component configuration shows how to setup the field to display the calculated shares for an input of "1000" units of the asset, adjusted for debouncing.
 *
 * @param {IProps<T>} props - The properties used to configure the `RHFReceiveAmountField` component.
 * @returns {React.ReactElement} Rendered component showing the expected amount of shares to receive and their USD equivalent based on current prices.
 */

export function RHFReceiveAmountField<T>({ ...other }: IProps<T>) {
  const {
    selectedLeverageToken: { data: leverageToken, ...rest },
    sharesToReceiveWithdrawData,
  } = useLeverageTokenFormContext();

  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={leverageToken?.address}
      dollarValue={{
        ...sharesToReceiveWithdrawData,
        data: sharesToReceiveWithdrawData?.data?.assetsToReceive?.dollarAmount,
      }}
      disabled
      value={sharesToReceiveWithdrawData?.data?.assetsToReceive?.tokenAmount.viewValue}
      hideMaxButton
      tokenData={{ ...rest, data: leverageToken?.underlyingAsset || {} }}
    />
  );
}
