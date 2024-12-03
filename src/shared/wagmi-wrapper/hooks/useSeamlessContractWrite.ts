import { Address } from "viem";
import { useConfig, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useState } from "react";
import { getParsedError } from "../../utils/errorParser";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { QueryKey } from "@tanstack/query-core";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";

export type SeamlessWriteAsyncParams = {
  onSuccess?: (txHash: Address) => void;

  onError?: (e: any) => void;
  onSettled?: () => void;
  hideDefaultErrorOnNotification?: boolean;
  queriesToInvalidate?: (QueryKey | undefined)[];
};

/**
 * Custom hook for writing to a smart contract using Wagmi.
 *
 * This hook provides functionality for writing to a smart contract using Wagmi, handling the asynchronous nature of the operation, error handling, and notifications.
 *
 * @param {SeamlessWriteAsyncParams} [settings] - Optional settings for the write operation.
 * @param {Function} [settings.onSuccess] - Callback function to be called on successful transaction.
 * @param {Function} [settings.onError] - Callback function to be called on transaction error.
 * @param {Function} [settings.onSettled] - Callback function to be called after the transaction settles (whether success or failure).
 * @param {boolean} [settings.hideDefaultErrorOnNotification] - If true, hides the default error notification.
 * @param {QueryKey[]} [settings.queriesToInvalidate] - Array of query keys to invalidate after the transaction settles.
 * @returns {Object} Object containing the following properties:
 * - {boolean} isPending - Indicates whether the transaction is pending.
 * - {string|undefined} errorMessage - The error message, if an error occurred during the transaction.
 * - {Function} writeContractAsync - Function to trigger the write operation.
 */

export function useSeamlessContractWrite(settings?: SeamlessWriteAsyncParams) {
  const wagmiConfig = useConfig();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { invalidateMany } = useInvalidateQueries();

  const onMutate = async () => setIsPending(true);

  const { showNotification } = useNotificationContext();

  const { writeContractAsync, ...rest } = useWriteContract({
    mutation: {
      onMutate,
      onSettled: async (txHash, error, args) => {
        try {
          if (error) throw error;

          // 1. wait for transaction receipt
          const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
            hash: txHash!,
          });

          // 2. throw if receipt is not valid
          if (txReceipt.status === "reverted") throw new Error("Execution reverted."); // todo: better way to handle reverted?

          // 3. invalidate queries
          if (settings?.queriesToInvalidate) await invalidateMany(settings?.queriesToInvalidate);

          // 4. call onSuccess callback
          settings?.onSuccess?.(txHash!);

          // 5. log result
          // eslint-disable-next-line no-console
          console.info("Operation successful:", txHash); // todo: add logging service

          // 6. return result
          return txHash;
        } catch (error) {
          // 1. log error
          const parsedError = getParsedError(error);
          console.error(
            `UseSeamlessContractWrite Operation failed with error(parsed): ${parsedError}`,
            { error },
            { args }
          );
          console.error({ error });

          // 2. set error message
          setErrorMessage(parsedError);

          // 3. show error notification
          if (!settings?.hideDefaultErrorOnNotification) {
            showNotification({
              status: "error",
              content: parsedError,
            });
          }

          // 4. call callback
          settings?.onError?.(error);
          // todo: display error notification always?
        } finally {
          setIsPending(false);
          // 1. call callback
          settings?.onSettled?.();
        }
        return undefined;
      },
    },
  });

  return {
    ...rest,
    errorMessage,
    isPending,
    writeContractAsync,
  };
}
