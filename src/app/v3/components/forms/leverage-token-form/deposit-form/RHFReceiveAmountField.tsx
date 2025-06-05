import { formatFetchBigIntToViewBigInt, IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import { useFetchFormattedAssetPrice } from "../../../../../statev3/queries/AssetPrice.hook";
import { cValueInUsd } from "../../../../../statev3/common/math/cValueInUsd";
import { useFullTokenData } from "../../../../../statev3/common/meta-data-queries/useFullTokenData";
import { USD_VALUE_DECIMALS } from "../../../../../../meta";
import { useMemo } from "react";

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
    selectedLeverageToken: { data: leverageToken },
    previewMintData,
  } = useLeverageTokenFormContext();

  const { data: leverageTokenData, ...leverageTokenDataRest } = useFullTokenData(leverageToken?.address);

  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={leverageToken?.address}
      dollarValue={{
        data: previewMintData?.data?.shares.dollarAmount,
        isLoading: previewMintData.isLoading,
        isFetched: previewMintData.isFetched,
      }}
      disabled
      value={previewMintData?.data?.shares.tokenAmount.viewValue}
      hideMaxButton
      tokenData={{ ...leverageTokenDataRest, data: leverageTokenData || {} }}
    />
  );
}
