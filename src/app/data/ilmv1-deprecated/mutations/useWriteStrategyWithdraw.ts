import { Address } from "viem";
import { loopStrategyAbi } from "@generated";
import {
  FetchData,
  getParsedError,
  SeamlessWriteAsyncParams,
  useNotificationContext,
  useSeamlessContractWrite,
} from "@shared";
import { PreviewWithdraw } from "../queries/useFetchWithdrawSharesToReceive";
import { targetChain } from "../../../config/rainbow.config";

export const useWriteStrategyWithdraw = (strategy?: Address) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();

  const { writeContractAsync, ...rest } = useSeamlessContractWrite();

  const withdrawAsync = async (
    args: {
      shares: bigint | undefined;
      from: Address;
      receiver: Address;
      previewWithdrawData?: FetchData<PreviewWithdraw>;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    const { shares, previewWithdrawData, from, receiver } = args;
    const assetsToReceive = previewWithdrawData?.data.assetsToReceive?.bigIntValue;
    try {
      /* ------------- */
      /*   BEFORE TX   */
      /* ------------- */
      if (!strategy) throw new Error("Strategy address is undefined.");
      if (previewWithdrawData == null || previewWithdrawData.isError || previewWithdrawData.error)
        throw new Error(previewWithdrawData?.error || "Failed to preview withdraw.");

      if (assetsToReceive == null) throw new Error("Assets to receive is undefined.");
      if (from == null) throw new Error("From address is undefined.");
      if (receiver == null) throw new Error("Receiver address is undefined.");
      if (shares == null) throw new Error("Shares is undefined.");

      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: strategy,
          abi: loopStrategyAbi,
          functionName: "redeem",
          args: [shares, from, receiver, assetsToReceive],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to withdraw from a ILMv1 strategy", error);

      showNotification({
        status: "error",
        content: `Failed to withdraw from a ILMv1 strategy: ${getParsedError(error)}`,
      });
    }
  };

  return {
    withdrawAsync,
    ...rest,
  };
};
