import { QueryKey } from "@tanstack/query-core";
import { useState } from "react";
import { Address } from "viem";
import { useConfig } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { getParsedError } from "../../utils/errorParser";
import { useInvalidateQueries } from "./useInvalidateQueries";

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
  console.log("settings", settings);
  const wagmiConfig = useConfig();

  const { invalidateMany } = useInvalidateQueries();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const onMutate = () => {
    console.log("00");
    setIsPending(true);
    console.log("01");
    setErrorMessage(undefined);
    console.log("02");
  };

  const onSettled = async (txHash: Address | undefined, error: any, args: any) => {
    try {
      console.log("10");
      if (error) throw error;

      console.log("1");

      // 1. wait for transaction receipt
      const txReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash!,
      });
      console.log("1");

      // 2. throw if receipt is not valid
      if (txReceipt.status === "reverted") throw new Error("Execution reverted."); // todo: better way to handle reverted?
      console.log("2");
      if (txReceipt.status !== "success") throw new Error("Execution reverted.");
      console.log("3");

      // 3. invalidate queries
      if (settings?.queriesToInvalidate) await invalidateMany(settings?.queriesToInvalidate);
      console.log("4");

      // 4. call onSuccess callback
      settings?.onSuccess?.(txHash!);
      console.log("5");

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
