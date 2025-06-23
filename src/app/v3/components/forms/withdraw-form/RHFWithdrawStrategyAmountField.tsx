import { IRHFAmountInputProps, RHFAmountInputV3, fParseUnits, formatFetchBigIntToViewBigInt, useToken } from "@shared";
import { useFormContext } from "react-hook-form";
import { Address } from "viem";
import { useMemo } from "react";
import { walletBalanceDecimalsOptions } from "@meta";
import { cValueInUsd } from "../../../../data/common/math/cValueInUsd";
import { useFetchViewAssetBalance } from "../../../../data/common/queries/useFetchViewAssetBalance";
import { useFetchAssetPrice } from "../../../../data/common/queries/useFetchViewAssetPrice";

type IProps<T> = Omit<
  IRHFAmountInputProps,
  "assetPrice" | "walletBalance" | "assetAddress" | "assetButton" | "name"
> & {
  name: keyof T;
  strategy: Address | undefined;
};

/**
 * `RHFWithdrawStrategyAmountField` Component Documentation
 *
 * This component is designed for managing asset withdrawal inputs in financial applications, particularly where strategy-based asset management is involved. It integrates with `react-hook-form` to provide a user-friendly interface for asset transactions, combining real-time data fetching for asset prices and wallet balances with USD conversion functionality.
 *
 * ## Key Features:
 * - **Real-Time Data Fetching**: Fetches the latest prices and wallet balances for the specified asset to provide up-to-date information.
 * - **USD Value Conversion**: Converts the entered asset amount to its equivalent in USD, using live market prices for precise financial calculations.
 * - **Strategy-Based Asset Selection**: Accepts a strategy address as a parameter to fetch related asset details, streamlining the form setup for strategy-specific operations.
 *
 * ## Props:
 * - `strategy`: The blockchain address of the strategy for which assets are being managed. This address is used for fetching relevant asset prices and balances.
 * - Inherits all other properties from `IRHFAmountInputProps<T>` but omits `assetPrice`, `walletBalance`, `assetAddress`, and `assetButton` to fit specific asset management needs.
 *
 * ## Usage Example:
 * ```jsx
 * <RHFWithdrawStrategyAmountField
 *   name="amount"
 *   strategy="0x123...DEF"
 * />
 * ```
 * This example shows how to use the component with a specified strategy address, which guides the data fetching for prices and balances, simplifying user interactions in a strategy-focused application.
 *
 * @param {IProps<T>} props - The props for configuring the `RHFWithdrawStrategyAmountField` component, tailored to strategy-specific asset management.
 * @returns {React.ReactElement} Renders an asset input component linked to specific strategies, enhanced with automatic data fetching and conversion functionalities.
 */
export function RHFWithdrawStrategyAmountField<T>({ strategy, focusOnAssetChange = true, ...other }: IProps<T>) {
  // *** metadata *** //
  const tokenData = useToken(strategy);

  // *** form functions *** //
  const { watch } = useFormContext();
  const value = watch(other.name as string);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchAssetPrice({ asset: strategy });

  // *** balance *** //
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(strategy, walletBalanceDecimalsOptions);
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
      assetAddress={strategy}
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
