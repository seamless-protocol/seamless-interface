// src/hooks/useClearIfExceedsBalance.ts
import { useEffect } from "react";
import { parseUnits } from "viem";

/**
 * Interface representing an on-chain balance in base (smallest) units.
 *
 * @interface Balance
 * @property {bigint} [bigIntValue] - The balance amount in smallest units (e.g., wei for ETH).
 * @property {number} [decimals] - Number of decimals used to parse human-readable input.
 */
export interface Balance {
  bigIntValue?: bigint;
  decimals?: number;
}

/**
 * React hook that clears a form field if its parsed numeric value exceeds a specified on-chain balance after wallet connects.
 *
 * ## Key Features:
 * - **Automatic Clearing**: Monitors a field value and resets it when it surpasses the balance.
 * - **Debounced Effect**: Runs when connection state or balance changes.
 * - **Error Safety**: Catches parse errors and logs them without breaking the app.
 *
 * @param {Object}   params             - Hook parameters.
 * @param {() => string}       params.getValue     - Function to retrieve the current field value.
 * @param {(value: string) => void} params.setValue     - Function to update the form field.
 * @param {Balance} [params.balance]     - The on-chain balance to compare against (in base units).
 * @param {boolean} [params.isConnected] - Flag indicating if the user is connected; effect is disabled otherwise.
 *
 * @example
 * ```tsx
 * // Clear "amount" if it exceeds on-chain balance
 * useClearIfExceedsBalance({
 *   getValue: () => methods.getValues('amount'),
 *   setValue: (val) => methods.setValue('amount', val),
 *   balance: { bigIntValue: onChainBalance, decimals: tokenDecimals },
 *   isConnected: isConnected,
 * });
 * ```
 */
export function useClearIfExceedsBalance({
  getValue,
  setValue,
  balance,
  isConnected,
}: {
  getValue: () => string;
  setValue: (value: string) => void;
  balance?: Balance;
  isConnected?: boolean;
}) {
  useEffect(() => {
    if (!isConnected) return;

    const raw = getValue();
    if (!raw) return;

    try {
      if (balance == null) throw new Error("Invalid balance data");
      if (balance.bigIntValue == null) throw new Error("Invalid balance data");
      if (balance.decimals == null) throw new Error("Invalid balance data");

      if (parseUnits(raw, balance.decimals) > balance.bigIntValue) {
        setValue("");
      }
    } catch (err) {
      console.error(`Error in useClearIfExceedsBalance:`, err);
    }
  }, [isConnected, balance?.bigIntValue, balance?.decimals, getValue, setValue]);
}
