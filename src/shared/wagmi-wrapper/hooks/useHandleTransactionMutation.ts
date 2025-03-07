import { waitForTransactionReceipt } from "wagmi/actions";
import { getParsedError } from "../../utils/errorParser";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { useConfig } from "wagmi";
import { QueryKey } from "@tanstack/query-core";
import { Address } from "viem";
import { useState } from "react";

export type SeamlessWriteAsyncParams = {
  onSuccess?: (txHash: Address) => void;
  onError?: (e: any) => void;
  onSettled?: () => void;
  queriesToInvalidate?: (QueryKey | undefined)[];
};

/**
 * Custom hook to handle transaction mutations.
 *
 * @returns {Function} A shared `onSettled` callback for transaction mutations.
 */
export function useHandleTransactionMutation({ settings }: { settings?: SeamlessWriteAsyncParams }) {
  const wagmiConfig = useConfig();

  const { invalidateMany } = useInvalidateQueries();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const onMutate = () => {
    setIsPending(true);
    setErrorMessage(undefined);
  };

  const onSettled = async (txHash: Address | undefined, error: any, args: any) => {
    try {
      if (error) throw error;

      // 1. wait for transaction receipt
      const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash!,
      });

      // 2. throw if receipt is not valid
      if (txReceipt.status === "reverted") throw new Error("Execution reverted."); // todo: better way to handle reverted?
      if (txReceipt.status !== "success") throw new Error("Execution reverted.");

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

      // 3. call callback
      settings?.onError?.(error);
    } finally {
      setIsPending(false);
      // 1. call callback
      settings?.onSettled?.();
    }
    return undefined;
  };

  return {
    onMutate,
    onSettled,
    isPending,
    errorMessage,
  };
}
