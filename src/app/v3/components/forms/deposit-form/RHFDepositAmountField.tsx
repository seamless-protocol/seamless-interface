import { IRHFAmountInputProps, RHFAmountInput, fParseUnits, formatFetchBigIntToViewBigInt, useToken } from "@shared";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchViewAssetBalance } from "../../../../state/common/queries/useFetchViewAssetBalance";
import { cValueInUsd } from "../../../../state/common/math/cValueInUsd";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { useFetchViewMaxUserDeposit } from "../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import { useFetchStrategyBySubStrategyAddressOrAddress } from "../../../../state/common/hooks/useFetchStrategyBySubStrategyAddress";
import { useFetchFormattedAssetPrice } from "../../../../statev3/queries/AssetPrice.hook";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
};
/**
 * `RHFDepositAmountField` Component Documentation
 *
 * This component integrates form input functionality for asset management in a DeFi context, primarily used for handling
 * asset amounts in deposit forms. It fetches asset-related data such as prices and balances, and computes equivalent dollar values
 * for user input amounts. It leverages the `react-hook-form` for form state management and updates.
 *
 * ## Key Features:
 * - **Dynamic Asset Data Fetching**: Fetches real-time data including asset prices and balances.
 * - **USD Conversion**: Computes the USD equivalent of the entered token amount based on the fetched asset price.
 * - **Form Integration**: Fully integrated with `react-hook-form` for seamless form state management.
 * - **Maximum Deposit Calculation**: Determines the maximum deposit amount based on user-specific conditions and strategy parameters.
 * - **Adaptive to Strategy Changes**: Adjusts the asset data fetching according to the selected strategy.
 *
 * ## Props:
 * - `name`: Identifies the form field within `react-hook-form`.
 * - `overrideUrlSlug`: (Optional) Custom URL parameters for asset data queries to ensure component's unique operation context.
 * - `assetAddress`: (Optional) Directly specify the asset address if no dynamic selection is needed; this disables asset selection UI elements.
 *
 * Inherits additional configuration options from `IRHFAmountInputProps`, minus specific props like `assetPrice`, `walletBalance`, and `assetButton` to adapt to the required context.
 *
 * ## Usage Example:
 * ```jsx
 * <RHFDepositAmountField
 *   name="depositAmount"
 *   overrideUrlSlug={{
 *     asset: "primaryAsset",
 *     isStrategy: "true",
 *   }}
 * />
 * <RHFDepositAmountField
 *   name="secondaryDepositAmount"
 *   assetAddress="0x123...def"
 * />
 * ```
 * The first instance uses `overrideUrlSlug` for dynamic asset querying based on UI interactions, while the second uses a static `assetAddress` for focused operations without user input.
 *
 * @param {IProps<T>} props - The configuration props for the `RHFDepositAmountField` component, adhering to specified types and requirements.
 * @returns {React.ReactElement} Rendered component with functionalities for asset data fetching, USD conversion, and form integration.
 */

export function RHFDepositAmountField<T>({ ...other }: IProps<T>) {
  // *** asset *** //
  const { strategy } = useFormSettingsContext();
  // todo replace this with new hooks when new state comes..
  const { data: strategyState } = useFetchStrategyBySubStrategyAddressOrAddress(strategy);
  const underlyingAssetAddress = strategyState?.underlyingAsset.address;

  // *** metadata *** //
  const {
    data: { decimals },
  } = useToken(underlyingAssetAddress);

  // *** form functions *** //
  const { watch } = useFormContext();
  const value = watch(other.name);

  // *** max *** //
  const maxUserDepositData = useFetchViewMaxUserDeposit(strategy);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(underlyingAssetAddress);

  // *** balance *** //
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(
    underlyingAssetAddress,
    walletBalanceDecimalsOptions
  );
  const dollarValueData = useMemo(() => {
    const valueBigInt = fParseUnits(value || "", decimals);
    const dollarBigIntValue = cValueInUsd(valueBigInt, price?.bigIntValue, decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price?.decimals,
      symbol: "~$",
    });
  }, [value, price?.decimals, price?.bigIntValue]);

  // *** JSX *** //
  return (
    <RHFAmountInput
      {...other}
      assetAddress={underlyingAssetAddress}
      dollarValue={{
        ...otherPrice,
        data: dollarValueData,
      }}
      walletBalance={{
        ...otherViewBalance,
        data: {
          ...viewBalance.balance,
        },
      }}
      protocolMaxValue={{
        ...maxUserDepositData,
      }}
    />
  );
}
