import { Hash } from "viem";
import { useConfig, useSendTransaction } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useState } from "react";
import { getParsedError } from "../../utils/errorParser";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { QueryKey } from "@tanstack/query-core";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";

export type SeamlessSendAsyncParams = {
  onSuccess?: (txHash: Hash) => void;
  onError?: (e: any) => void;
  onSettled?: () => void;
  hideDefaultErrorOnNotification?: boolean;
  queriesToInvalidate?: (QueryKey | undefined)[];
};

/**
 * Custom hook for sending a transaction using Wagmi.
 *
 * This hook provides functionality for sending a transaction,
 * handling the asynchronous nature, error handling, notifications, etc.
 *
 * @param {SeamlessSendAsyncParams} [settings] - Optional settings for the transaction.
 * @returns {Object} Object containing the following properties:
 * - {boolean} isPending - Indicates whether the transaction is pending.
 * - {string|undefined} errorMessage - The error message, if an error occurred.
 * - {Function} sendTransactionAsync - Function to trigger the send operation.
 */

export function useSeamlessSendTransaction(settings?: SeamlessSendAsyncParams) {
  const wagmiConfig = useConfig();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { invalidateMany } = useInvalidateQueries();
  const { showNotification } = useNotificationContext();

  // The `useSendTransaction` hook from Wagmi
  const { sendTransactionAsync, ...rest } = useSendTransaction({
    mutation: {
      onMutate: async () => setIsPending(true),
      onSettled: async (txHash, error, args) => {
        try {
          if (error) throw error;

          // 1. wait for transaction receipt
          const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
            hash: txHash!,
          });

          // 2. throw if receipt is not valid
          if (txReceipt.status === "reverted") {
            throw new Error("Execution reverted.");
          }

          // 3. invalidate queries if provided
          if (settings?.queriesToInvalidate) {
            await invalidateMany(settings.queriesToInvalidate);
          }

          // 4. call onSuccess callback
          settings?.onSuccess?.(txHash!);

          // 5. logging
          // eslint-disable-next-line no-console
          console.info("Transaction successful:", txHash);

          // 6. return result
          return txHash;
        } catch (err) {
          const parsedError = getParsedError(err);
          console.error(`useSeamlessSendTransaction failed with error: ${parsedError}`, { err }, { args });

          // show error notification
          if (!settings?.hideDefaultErrorOnNotification) {
            showNotification({
              status: "error",
              content: parsedError,
            });
          }

          // set error message
          setErrorMessage(parsedError);

          // call onError callback
          settings?.onError?.(err);
        } finally {
          setIsPending(false);
          // call onSettled callback
          settings?.onSettled?.();
        }
        return undefined;
      },
    },
  });

  return {
    ...rest,
    isPending,
    errorMessage,
    sendTransactionAsync,
  };
}
