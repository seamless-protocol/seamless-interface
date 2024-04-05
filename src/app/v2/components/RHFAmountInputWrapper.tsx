import { IRHFAmountInputProps, RHFAmountInput, formatFetchBigIntToViewBigInt } from "@shared";
import { useFetchAssetPrice } from "../../state/common/queries/useFetchViewAssetPrice";
import { OverrideUrlSlug, useAssetPickerState } from "../hooks/useAssetPickerState";
import { useFetchViewAssetBalance } from "../../state/common/queries/useFetchViewAssetBalance";
import { useFormContext } from "react-hook-form";
import { Address, parseUnits } from "viem";
import { useMemo } from "react";
import { AssetButton } from "./AssetButton";
import { walletBalanceDecimalsOptions } from "@meta";

type IProps<T> = Omit<IRHFAmountInputProps<T>, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  overrideUrlSlug?: OverrideUrlSlug;
  assetAddress?: Address;
};
/**
 * `RHFAmountInputWrapper` Component Documentation
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
 * <RHFAmountInputWrapper
 *   name="amount1"
 *   overrideUrlSlug={{
 *     asset: "supplyAsset",
 *     isStrategy: "false",
 *   }}
 * />
 * <RHFAmountInputWrapper
 *   name="amount2"
 *   assetAddress="0x123...abc"
 * />
 * ```
 * In the first instance, an `overrideUrlSlug` is used for dynamic asset selection through the UI. In the second instance, a specific `assetAddress` is provided, disabling the asset selection button and focusing the input on the specified asset.
 *
 * @param {IProps<T>} props - The props for configuring the `RHFAmountInputWrapper` component.
 * @returns {React.ReactElement} The `RHFAmountInputWrapper` component, integrated with functionalities for asset price fetching and balance display.
 */

export function RHFAmountInputWrapper<T>({ overrideUrlSlug, assetAddress, ...other }: IProps<T>) {
  const { asset: assetFromUrl } = useAssetPickerState({ overrideUrlSlug });
  const asset = assetAddress || assetFromUrl;

  const { data: price, ...otherPrice } = useFetchAssetPrice(asset);
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(asset, walletBalanceDecimalsOptions);

  const { watch } = useFormContext();
  const value = watch(other.name);

  const dollarValueData = useMemo(() => {
    const valueBigInt = parseUnits(value || "", price.decimals);
    const dollarBigIntValue = (valueBigInt * price.bigIntValue) / BigInt(10 ** price.decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price.decimals,
      symbol: "~$",
    });
  }, [value, price.decimals, price.bigIntValue]);

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
