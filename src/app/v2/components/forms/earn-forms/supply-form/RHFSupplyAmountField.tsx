import { IRHFAmountInputProps, RHFAmountInput, fParseUnits, formatFetchBigIntToViewBigInt, useToken } from "@shared";
import { useFormContext } from "react-hook-form";
import { Address } from "viem";
import { useMemo } from "react";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { useFetchAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import { OverrideUrlSlug, useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { AssetButton } from "../../../AssetButton";
import { cValueInUsd } from "../../../../../state/common/math/cValueInUsd";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
  overrideUrlSlug?: OverrideUrlSlug;
  assetAddress?: Address;
};
/**
 * `RHFSupplyAmountField` Component Documentation
 *
 * Wraps input functionality for assets by incorporating features for fetching asset prices, displaying wallet balances,
 * and converting input values into their equivalent dollar amounts based on the current asset prices. This component is
 * designed for seamless integration with forms managed by `react-hook-form`.
 *
 * ## Key Features:
 * - **Asset Price and Balance Fetching**: Automatically retrieves and displays the current price and wallet balance of the specified asset.
 * - **Value-to-Dollar Conversion**: Converts the input value to its equivalent dollar value, using the current asset price for accurate conversion.
 * - **Dynamic Asset Selection**: Supports dynamic selection of assets through a UI component, which can be disabled by specifying an `assetAddress` directly.
 * - **Flexible Configuration**: Can be uniquely configured for each instance using `overrideUrlSlug` to ensure independent operation and avoid state conflicts in applications requiring multiple inputs.
 *
 * ## Props:
 * - `overrideUrlSlug`: Object specifying URL query parameters. Must be unique for each component instance to ensure that each operates independently, particularly important in scenarios with multiple inputs.
 * - `assetAddress`: (Optional) Address of the asset to be used. If provided, the asset selection button is disabled, and this address is used for fetching asset prices and balances directly, bypassing the need for user selection.
 * - Inherits additional props from `IRHFAmountInputProps<T>`, excluding `assetPrice`, `walletBalance`, `assetAddress`, and `assetButton`, allowing for customized handling of asset inputs.
 *
 * ## Usage Example:
 * ```jsx
 * <RHFSupplyAmountField
 *   name="amount1"
 *   overrideUrlSlug={{
 *     asset: "supplyAsset",
 *     isStrategy: "false",
 *   }}
 * />
 * <RHFSupplyAmountField
 *   name="amount2"
 *   assetAddress="0x123...abc"
 * />
 * ```
 * In the first instance, an `overrideUrlSlug` is used for dynamic asset selection through the UI. In the second instance, a specific `assetAddress` is provided, disabling the asset selection button and focusing the input on the specified asset.
 *
 * @param {IProps<T>} props - The props for configuring the `RHFSupplyAmountField` component.
 * @returns {React.ReactElement} The `RHFSupplyAmountField` component, integrated with functionalities for asset price fetching and balance display.
 */

export function RHFSupplyAmountField<T>({ overrideUrlSlug, assetAddress, ...other }: IProps<T>) {
  // *** warning *** //
  if (!overrideUrlSlug && !assetAddress) {
    // eslint-disable-next-line no-console
    console.warn(
      "RHFSupplyAmountField requires either 'overrideUrlSlug' or 'assetAddress' prop to be passed for proper functionality."
    );
  }

  // *** asset *** //
  const { asset: assetFromUrl } = useAssetPickerState({ overrideUrlSlug });
  const asset = assetAddress || assetFromUrl;

  // *** metadata *** //
  const {
    data: { decimals },
  } = useToken(asset);

  // *** form functions *** //
  const { watch } = useFormContext();
  const value = watch(other.name);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchAssetPrice({ asset });

  // *** balance *** //
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(asset, walletBalanceDecimalsOptions);
  const dollarValueData = useMemo(() => {
    const valueBigInt = fParseUnits(value || "", decimals);
    const dollarBigIntValue = cValueInUsd(valueBigInt, price?.bigIntValue, decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price.decimals,
      symbol: "~$",
    });
  }, [value, price.decimals, price.bigIntValue]);

  // *** JSX *** //
  return (
    <RHFAmountInput
      {...other}
      assetAddress={asset}
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
      assetButton={!assetAddress ? <AssetButton overrideUrlSlug={overrideUrlSlug} /> : null}
    />
  );
}
