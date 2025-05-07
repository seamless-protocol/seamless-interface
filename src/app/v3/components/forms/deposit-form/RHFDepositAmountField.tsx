import { IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenDepositFormContext } from "../contexts/leverage-token-form-provider/deposit/LeverageTokenDepositFormProvider";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};
/**
 * `RHFDepositAmountField` Component Documentation
 *
 * ## Usage Example:
 * ```jsx

 * <RHFDepositAmountField
 *   name="secondaryDepositAmount"
 * />
 * ```
 * @param {IProps<T>} props - The configuration props for the `RHFDepositAmountField` component, adhering to specified types and requirements.
 * @returns {React.ReactElement} Rendered component with functionalities for asset data fetching, USD conversion, and form integration.
 */

export function RHFDepositAmountField<T>({ ...other }: IProps<T>) {
  const { selectedLeverageToken, maxUserDepositData, balance, amountUsdValue } = useLeverageTokenDepositFormContext();
  const { data: { underlyingAssetAddress, underlyingAsset } = {}, ...rest } = selectedLeverageToken;

  // *** JSX *** //
  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={underlyingAssetAddress}
      dollarValue={{
        ...amountUsdValue,
        data: amountUsdValue.data,
      }}
      walletBalance={{
        ...balance,
        data: {
          ...balance?.data.balance,
        },
      }}
      protocolMaxValue={{
        ...maxUserDepositData,
      }}
      tokenData={{ ...rest, data: underlyingAsset || {} }}
    />
  );
}
