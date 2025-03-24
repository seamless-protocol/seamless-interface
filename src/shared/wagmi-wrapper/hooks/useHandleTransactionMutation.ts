import { waitForTransactionReceipt } from "wagmi/actions";
import { getParsedError } from "../../utils/errorParser";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";
import { useInvalidateQueries } from "./useInvalidateQueries";
import { useConfig } from "wagmi";
import { QueryKey } from "@tanstack/query-core";
import { Address } from "viem";
import { useInvalidateQueriesv2 } from "./useInvalidateQueriesv2";
import { SeamlessQueryKey } from "../../../meta";

export type SeamlessWriteAsyncParams = {
  onSuccess?: (txHash: Address) => void;

  onError?: (e: any) => void;
  onSettled?: () => void;
  hideDefaultErrorOnNotification?: boolean;
  queriesToInvalidate?: (QueryKey | undefined)[];
  queriesToInvalidatev2?: (SeamlessQueryKey | QueryKey | undefined)[];
};

/**
 * Custom hook to handle transaction mutations.
 *
 * @returns {Function} A shared `onSettled` callback for transaction mutations.
 */
export function useHandleTransactionMutation({
  setIsPending,
  setErrorMessage,
  settings,
}: {
  setIsPending: (isPending: boolean) => void;
  setErrorMessage: (errorMessage: string | undefined) => void;
  settings?: SeamlessWriteAsyncParams;
}) {
  const { invalidateMany } = useInvalidateQueries();
  const { invalidateMany: invalidateManyv2 } = useInvalidateQueriesv2();
  const { showNotification } = useNotificationContext();
  const wagmiConfig = useConfig();

  return async (txHash: Address | undefined, error: any, args: any) => {
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
      if (settings?.queriesToInvalidatev2) await invalidateManyv2(settings?.queriesToInvalidatev2);

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
  };
}
