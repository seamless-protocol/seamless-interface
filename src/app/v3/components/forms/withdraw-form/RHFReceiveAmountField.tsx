import { IRHFAmountInputProps, RHFAmountInput } from "@shared";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { formatUnits } from "viem";
import {
  useFetchViewWithdrawSharesToReceive,
  useFetchWithdrawSharesToReceive,
} from "../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useFetchTokenData } from "../../../../statev3/metadata/TokenData.fetch";

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
  const { data: { underlying } = {} } = useFetchTokenData(strategy);
  const { data: sharesToReceive, ...restShares } = useFetchViewWithdrawSharesToReceive(debouncedAmount, strategy);
  const { assetsToReceive } = sharesToReceive || {};

  // *** assets to receive *** //
  const value = assetsToReceive?.tokenAmount.bigIntValue
    ? formatUnits(assetsToReceive?.tokenAmount.bigIntValue, assetsToReceive.decimals)
    : "0";

  // *** JSX *** //
  return (
    <RHFAmountInput
      {...other}
      assetAddress={underlying}
      dollarValue={{
        ...assetsToReceiveRest,
        data: assetsToReceiveInUsd,
      }}
      disabled
      value={value}
      hideMaxButton
    />
  );
}
