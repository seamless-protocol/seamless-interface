import { formatFetchBigIntToViewBigInt, fUsdValueStructured, IRHFAmountInputProps, RHFAmountInputV3 } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import { useFetchLeverageTokenAssets } from "../../../../../data/leverage-tokens/queries/leverage-token-assets/leverage-token-assets.hook";
import { useFullTokenData } from "../../../../../statev3/common/meta-data-queries/useFullTokenData";
import { useFetchAssetPriceInBlock } from "../../../../../statev3/common/queries/useFetchViewAssetPrice";
import { useMemo } from "react";
import { cValueInUsd } from "../../../../../statev3/common/math/cValueInUsd";
import { parseUnits } from "viem";

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
  const { selectedLeverageToken, maxUserDepositData, debouncedDepositAmount, balance } = useLeverageTokenFormContext();

  const { data: leverageTokenAssets } = useFetchLeverageTokenAssets(selectedLeverageToken.data?.address);

  const { data: collateralTokenData, ...collateralTokenRest } = useFullTokenData(leverageTokenAssets?.collateralAsset);

  const { data: collateralAssetPriceData, ...collateralAssetPriceRest } = useFetchAssetPriceInBlock(
    leverageTokenAssets?.collateralAsset
  );

  const depositAmountUsdValue = useMemo(() => {
    if (collateralAssetPriceData?.bigIntValue && collateralTokenData?.decimals) {
      return formatFetchBigIntToViewBigInt(
        fUsdValueStructured(
          cValueInUsd(
            parseUnits(debouncedDepositAmount, collateralTokenData?.decimals),
            collateralAssetPriceData.bigIntValue,
            collateralTokenData?.decimals
          )
        )
      );
    }

    return undefined;
  }, [collateralAssetPriceData?.bigIntValue, debouncedDepositAmount]);

  // *** JSX *** //
  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={leverageTokenAssets?.collateralAsset}
      dollarValue={{
        data: depositAmountUsdValue,
        isLoading: collateralAssetPriceRest.isLoading || collateralTokenRest.isLoading,
        isFetched: collateralAssetPriceRest.isFetched && collateralTokenRest.isFetched,
      }}
      walletBalance={{
        ...balance,
        data: {
          ...balance?.data.balance,
        },
      }}
      protocolMaxValue={{
        isLoading: maxUserDepositData.isLoading,
        isFetched: maxUserDepositData.isFetched,
        data: {
          ...maxUserDepositData.data,
          value: maxUserDepositData.data.bigIntValue?.toString(),
        },
      }}
      tokenData={{ ...collateralTokenRest, data: collateralTokenData || {} }}
    />
  );
}
