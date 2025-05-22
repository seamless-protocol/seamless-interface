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
 * React hook that clears a form field whenever the user connects their wallet
 * and the field's numeric value exceeds the provided on-chain balance.
 *
 * @template TRawValue
 *
 * @param {object}               params                   - Hook parameters.
 * @param {() => string}         params.getValue         - Function returning the current raw string value of the field (e.g., from React Hook Form). Should return the human-readable amount (no decimals applied).
 * @param {(value: string) => void} params.setValue       - Function to update/reset the form field value. Called with an empty string to clear.
 * @param {object}               params.balance           - On-chain balance details.
 * @param {bigint}               params.balance.bigIntValue  - Balance in base (smallest) units (e.g., wei).
 * @param {number}               params.balance.decimals     - Number of decimals used to parse the raw string into base units.
 * @param {boolean}              params.isConnected       - Whether the user is currently connected; the clear effect only runs when true.
 *
 * @example
 * ```tsx
 * useClearIfExceedsBalanceAfterWalletConnect({
 *   getValue: () => methods.getValues('amount'),
 *   setValue: (val) => methods.setValue('amount', val),
 *   balance: { bigIntValue: onChainBalance, decimals: tokenDecimals },
 *   isConnected: isConnected,
 * });
 * ```
 */
export function useClearIfExceedsBalanceAfterWalletConnect({
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
      if (balance.bigIntValue == null) throw new Error("Invalid bigIntValue");
      if (balance.decimals == null) throw new Error("Invalid decimals");

      if (parseUnits(raw, balance.decimals) > balance.bigIntValue) {
        setValue("");
      }
    } catch (err) {
      console.error(`Error in useClearIfExceedsBalance:`, err);
    }
  }, [isConnected, getValue, setValue]);
}
