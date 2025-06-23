import { IRHFAmountInputProps, RHFAmountInputV3, fParseUnits, formatFetchBigIntToViewBigInt, useToken } from "@shared";
import { useFormContext } from "react-hook-form";
import { Address } from "viem";
import { useMemo } from "react";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchViewAssetBalance } from "../../../../../data/common/queries/useFetchViewAssetBalance";
import { cValueInUsd } from "../../../../../data/common/math/cValueInUsd";
import { useFetchFormattedAssetPrice } from "../../../../../data/common/queries/AssetPrice.hook";

type IProps<T> = Omit<
  IRHFAmountInputProps,
  "assetPrice" | "walletBalance" | "assetAddress" | "assetButton" | "name"
> & {
  name: keyof T;
  vault: Address | undefined;
};

/**
 * `RHFWithdrawVaultAmountField` Component Documentation
 *
 * This component is designed for managing asset withdrawal inputs in financial applications, particularly where vault-based asset management is involved. It integrates with `react-hook-form` to provide a user-friendly interface for asset transactions, combining real-time data fetching for asset prices and wallet balances with USD conversion functionality.
 *
 * ## Key Features:
 * - **Real-Time Data Fetching**: Fetches the latest prices and wallet balances for the specified asset to provide up-to-date information.
 * - **USD Value Conversion**: Converts the entered asset amount to its equivalent in USD, using live market prices for precise financial calculations.
 * - **Strategy-Based Asset Selection**: Accepts a vault address as a parameter to fetch related asset details, streamlining the form setup for vault-specific operations.
 *
 * ## Props:
 * - `vault`: The blockchain address of the vault for which assets are being managed. This address is used for fetching relevant asset prices and balances.
 * - Inherits all other properties from `IRHFAmountInputProps<T>` but omits `assetPrice`, `walletBalance`, `assetAddress`, and `assetButton` to fit specific asset management needs.
 *
 * ## Usage Example:
 * ```jsx
 * <RHFWithdrawVaultAmountField
 *   name="amount"
 *   vault="0x123...DEF"
 * />
 * ```
 * This example shows how to use the component with a specified vault address, which guides the data fetching for prices and balances, simplifying user interactions in a vault-focused application.
 *
 * @param {IProps<T>} props - The props for configuring the `RHFWithdrawVaultAmountField` component, tailored to vault-specific asset management.
 * @returns {React.ReactElement} Renders an asset input component linked to specific vaults, enhanced with automatic data fetching and conversion functionalities.
 */
export function RHFWithdrawVaultAmountField<T>({ vault, focusOnAssetChange = true, ...other }: IProps<T>) {
  // *** metadata *** //
  const tokenData = useToken(vault);

  // *** form functions *** //
  const { watch } = useFormContext();
  const value = watch(other.name as string);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(vault);

  // *** balance *** //
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(vault, walletBalanceDecimalsOptions);
  const dollarValueData = useMemo(() => {
    const valueBigInt = fParseUnits(value || "", tokenData?.data?.decimals);
    const dollarBigIntValue = cValueInUsd(valueBigInt, price?.bigIntValue, tokenData?.data?.decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price.decimals,
      symbol: "~$",
    });
  }, [value, price.decimals, price.bigIntValue]);

  // *** JSX *** //
  return (
    <RHFAmountInputV3
      {...other}
      name={other.name as string}
      assetAddress={vault}
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
        ...otherViewBalance,
        data: {
          ...viewBalance.balance,
        },
      }}
      tokenData={{ ...tokenData }}
    />
  );
}
