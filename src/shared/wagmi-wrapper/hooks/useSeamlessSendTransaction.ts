import { Hash } from "viem";
import { useSendTransaction } from "wagmi";
import { QueryKey } from "@tanstack/query-core";
import { useHandleTransactionMutation } from "./useHandleTransactionMutation";

export type SeamlessSendAsyncParams = {
  onSuccess?: (txHash: Hash) => void;
  onError?: (e: any) => void;
  onSettled?: () => void;
  queriesToInvalidate?: (QueryKey | undefined)[];
};

/**
 * Custom hook for sending a transaction using Wagmi.
 *
 * This hook provides functionality for sending a transaction using Wagmi, handling the asynchronous nature of the operation, error handling, and notifications.
 *
 * @param {SeamlessWriteAsyncParams} [settings] - Optional settings for the write operation.
 * @param {Function} [settings.onSuccess] - Callback function to be called on successful transaction.
 * @param {Function} [settings.onError] - Callback function to be called on transaction error.
 * @param {Function} [settings.onSettled] - Callback function to be called after the transaction settles (whether success or failure).
 * @param {Function} [settings.onErrorAsync] - Async callback fired on transaction error; receives the error.
 * @param {Function} [settings.onSettled] - Synchronous callback fired once the transaction fully settles (regardless of success or failure).
 * @param {Function} [settings.onSettledAsync] - Async callback fired once the transaction fully settles (regardless of success or failure).
 * @param {QueryKey[]} [settings.queriesToInvalidate] - Array of query keys to invalidate after the transaction settles.
 * @returns {Object} Object containing the following properties:
 * - {boolean} isPending - Indicates whether the transaction is pending.
 * - {string|undefined} errorMessage - The error message, if an error occurred during the transaction.
 * - {Function} sendTransactionAsync - Function to trigger the send transaction mutation.
 */

export function useSeamlessSendTransaction(settings?: SeamlessSendAsyncParams) {
  const { isPending, errorMessage, onMutate, onSettled } = useHandleTransactionMutation({
    settings,
  });

  const { sendTransactionAsync, ...rest } = useSendTransaction({
    mutation: {
      onMutate,
      onSettled,
    },
  });

  return {
    ...rest,
    isPending,
    errorMessage,
    sendTransactionAsync,
  };
}
