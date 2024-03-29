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
 * `useSeamlessContractWrite` Hook
 *
 * A React hook for performing seamless write operations on blockchain contracts. It abstracts the complexity of managing transaction states, error handling, and query invalidation post-transaction, providing a simplified and efficient interface for contract interactions.
 *
 * ## Key Overrides:
 * - **isPending** - now waits for transaction receipt.
 * - **errorMessage** - now shows error if any: get transaction receipt or contract write fails.
 * - **seamlessWriteAsync** - now have extended functionalities on top of writeContractAsync.
 *
 * ## Key Features:
 * - **Simplified Transaction Management**: Handles the lifecycle of a transaction, including sending, receipt waiting, and status checking.
 * - **Automated Query Invalidation**: Supports invalidating React Query queries post-transaction, ensuring data consistency across the application.
 * - **Comprehensive Error Handling**: Captures and manages errors during the transaction process, allowing for custom error handling strategies.
 * - **Customizable Success, Error, and Settled Callbacks**: Offers hooks for actions on transaction success, error, and after transaction settlement.
 *
 * ## Parameters:
 * - `config`: Configuration for the contract write operation, including ABI, contract address, and function name.
 *
 * ## Usage:
 *
 * ```tsx
 * const { seamlessWriteAsync, errorMessage } = useSeamlessContractWrite({
 *   abi: contractABI,
 *   addressOrName: contractAddress,
 *   functionName: "contractMethodName",
 * });
 *
 * const handleWrite = async () => {
 *   await seamlessWriteAsync({
 *     args: [arg1, arg2], // Arguments for the contract method
 *   }, {
 *     onSuccess: (txHash) => console.log(`Transaction successful with hash: ${txHash}`),
 *     onError: (error) => console.error(`Transaction failed with error: ${error}`),
 *     onSettled: () => console.log(`Transaction settled`),
 *     queriesToInvalidate: ["queryKey1", "queryKey2"],
 *   });
 * };
 * ```
 *
 * This example demonstrates how to perform a contract write operation with the `useSeamlessContractWrite` hook, handling success, error, and post-transaction actions.
 *
 * @template TAbi The contract ABI type.
 * @template TAddress The contract address type, supporting single or multiple addresses.
 * @template TFunctionName The name of the contract function to be invoked, constrained by the ABI and the function's mutability (payable or nonpayable).
 * @param config Configuration object for the write operation, including ABI, contract address, and function name.
 * @returns An object with the `seamlessWriteAsync` function for executing the write operation, along with `errorMessage` for any errors that occurred, and other properties from the underlying `createUseWriteContract` hook.
 */

export function useSeamlessContractWrite(
  settings?: SeamlessWriteAsyncParams,
) {
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
          if (txReceipt.status === "reverted")
            throw new Error("Execution reverted."); // todo: better way to handle reverted?
    
          // 3. invalidate queries
          if (settings?.queriesToInvalidate) await invalidateMany(settings?.queriesToInvalidate);
    
          // 4. call onSuccess callback
          settings?.onSuccess?.(txHash!);
    
          // 5. log result
          console.info("Operation successful:", txHash); // todo: add logging service
    
          // 6. return result
          return txHash;
        } catch (error) {
          // 1. log error
          console.error(
            "UseSeamlessContractWrite Operation failed:",
            { error },
            { args }
          );
    
          const parsedError = getParsedError(error);
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
