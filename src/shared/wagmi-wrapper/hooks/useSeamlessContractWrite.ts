import { Abi, Address, ContractFunctionName } from "viem";
import { createUseWriteContract } from "wagmi/codegen";
import { CreateUseWriteContractParameters } from "wagmi/dist/types/hooks/codegen/createUseWriteContract";
import { useConfig } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from "react";
import { getParsedError } from "../../utils/errorPersers";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryStore } from "../store/QueryStore";

type SeamlessWriteAsyncParams = {
  onSuccess?: (txHash: Address) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (e: any) => void;
  onSettled?: () => void;
  queriesToInvalidate?: string[];
};

export function useSeamlessContractWrite<
  TAbi extends Abi | readonly unknown[],
  TAddress extends Address | Record<number, Address> | undefined = undefined,
  TFunctionName extends
    | ContractFunctionName<TAbi, "nonpayable" | "payable">
    | undefined = undefined,
>(config: CreateUseWriteContractParameters<TAbi, TAddress, TFunctionName>) {
  //todo add loading
  const queryClient = useQueryClient();
  const { getQueryKey } = useQueryStore();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const writeHook = createUseWriteContract({ ...config });
  const { writeContractAsync, error, ...rest } = writeHook();
  const wagmiConfig = useConfig();

  useEffect(() => {
    setErrorMessage(error?.message);
  }, [error?.message, setErrorMessage]);

  const seamlessWriteAsync = async (
    args: Parameters<typeof writeContractAsync>[0],
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      const txHash = await writeContractAsync(args);
      const result = await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash,
      });
      if (result.status === "reverted") throw new Error("Execution reverted."); //todo ?
      settings?.onSuccess?.(txHash);

      //invalidate queries
      if (settings?.queriesToInvalidate) {
        settings.queriesToInvalidate.forEach(async (queryId) => {
          const queryKey = getQueryKey(queryId);
          if (queryKey) await queryClient.invalidateQueries({ queryKey });
        });
      }

      //console log todo: add logging service
      console.log("Operation successful:", txHash);

      return txHash;
    } catch (error) {
      settings?.onError?.(error);

      console.error("Operation failed:", error);
      setErrorMessage(getParsedError(error));
    } finally {
      settings?.onSettled?.();
    }
    return undefined;
  };

  return {
    ...rest,
    errorMessage,
    seamlessWriteAsync,
  };
}
