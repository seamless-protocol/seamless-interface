import {
  IRHFAmountInputProps,
  RHFAmountInputV3,
  fParseUnits,
  formatFetchBigIntToViewBigInt,
  mergeQueryStates,
  useToken,
} from "@shared";
import { useMemo } from "react";
import { cValueInUsd } from "../../../../data/common/math/cValueInUsd";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { useFetchDepositSharesToReceive } from "../../../../data/ilmv1-deprecated/queries/useFetchDepositSharesToReceive";
import { formatUnits } from "viem";
import { useFetchFormattedAssetPrice } from "../../../../data/common/queries/AssetPrice.hook";
import { USD_VALUE_DECIMALS } from "../../../../../meta";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
  debouncedAmount: string;
};
/**
 * `RHFReceiveAmountField` Component Documentation
 *
 * This component facilitates the input and display of expected share amounts a user would receive upon a deposit,
 * calculated based on current market conditions and strategy parameters. It is integrated with `react-hook-form` for
 * form management, ensuring real-time updates and synchronization with form state.
 *
 * ## Key Features:
 * - **Shares Calculation**: Calculates the shares to be received based on the amount inputted by the user and the current strategy.
 * - **Dynamic Asset Price Fetching**: Retrieves the latest price for the asset associated with the strategy to calculate the USD equivalent of the shares.
 * - **Form Integration**: Uses `react-hook-form` for seamless form operations and state updates.
 * - **Query State Management**: Utilizes `mergeQueryStates` to handle multiple query states efficiently, ensuring the component is responsive and stable under various network conditions.
 * - **USD Value Calculation**: Computes the dollar value of the shares using the latest asset price, providing a financial perspective to the user's potential investment or deposit.
 *
 * ## Props:
 * - `name`: Field identifier within `react-hook-form`.
 * - `debouncedAmount`: The user input amount, debounced to prevent excessive calculations and queries, which serves as the base for calculating the shares to receive.
 * - Inherits from `IRHFAmountInputProps<T>` but excludes properties like `assetPrice`, `walletBalance`, `assetAddress`, and `assetButton` which are managed internally or are irrelevant due to the context.
 *
 * ## Usage Example:
 * ```jsx
 * <RHFReceiveAmountField
 *   name="expectedShares"
 *   debouncedAmount="1000"
 * />
 * ```
 * This component configuration shows how to setup the field to display the calculated shares for an input of "1000" units of the asset, adjusted for debouncing.
 *
 * @param {IProps<T>} props - The properties used to configure the `RHFReceiveAmountField` component.
 * @returns {React.ReactElement} Rendered component showing the expected amount of shares to receive and their USD equivalent based on current prices.
 */

export function RHFReceiveAmountField<T>({ debouncedAmount, ...other }: IProps<T>) {
  // *** strategy *** //
  const { strategy } = useFormSettingsContext();

  // *** shares to receive *** //
  const {
    data: { sharesToReceive },
    ...sharesRest
  } = useFetchDepositSharesToReceive(debouncedAmount, strategy);
  const value =
    sharesToReceive?.bigIntValue && sharesToReceive?.decimals
      ? formatUnits(sharesToReceive.bigIntValue, sharesToReceive.decimals)
      : "0";

  // *** metadata *** //
  const tokenData = useToken(strategy);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(strategy);

  const dollarValueData = useMemo(() => {
    const valueBigInt = fParseUnits(value || "", tokenData?.data?.decimals);
    const dollarBigIntValue = cValueInUsd(valueBigInt, price?.bigIntValue, tokenData?.data?.decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: USD_VALUE_DECIMALS,
      symbol: "~$",
    });
  }, [value, price?.bigIntValue]);

  // *** rest *** //
  const rest = mergeQueryStates([sharesRest, otherPrice]);

  // *** JSX *** //
  return (
    <RHFAmountInputV3
      {...other}
      assetAddress={strategy}
      dollarValue={{
        ...rest,
        data: dollarValueData,
      }}
      disabled
      value={value}
      hideMaxButton
      tokenData={{ ...tokenData }}
    />
  );
}
