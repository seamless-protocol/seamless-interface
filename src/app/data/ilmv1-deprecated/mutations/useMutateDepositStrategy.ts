import {
  FetchData,
  getParsedError,
  SeamlessWriteAsyncParams,
  useNotificationContext,
  useSeamlessContractWrite,
} from "@shared";
import { loopStrategyAbi } from "@generated";
import { useAccount } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { FullStrategyData } from "../metadata/FullStrategyData.all";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { targetChain } from "../../../config/rainbow.config";
import { SharesToReceiveData } from "../queries/useFetchDepositSharesToReceive";

export const useMutateDepositStrategy = (strategy?: FullStrategyData) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { showNotification } = useNotificationContext();
  const { address } = useAccount();

  /* -------------------- */
  /*   Query cache keys   */
  /* -------------------- */
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(strategy?.underlying);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: strategy?.underlying,
    spender: strategy?.address,
  });

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [...((accountAssetBalanceQK ?? []) as QueryKey[]), assetAllowanceQK],
  });

  /* ------------------- */
  /*   Mutation function */
  /* ------------------- */
  const depositAsync = async (
    args: {
      amount: bigint | undefined;
      previewDepositData?: FetchData<SharesToReceiveData>;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    const { amount, previewDepositData } = args;
    const sharesToReceive = previewDepositData?.data.sharesToReceive?.bigIntValue;

    try {
      /* ------------- */
      /*   BEFORE TX   */
      /* ------------- */
      if (!strategy?.address) throw new Error("Strategy address is undefined.");
      if (previewDepositData == null || previewDepositData.isError || previewDepositData.error)
        throw new Error(previewDepositData?.error || "Failed to preview deposit. (Simulation failed).");
      if (!address) throw new Error("Account address is not found. Please try again later.");

      if (sharesToReceive == null) throw new Error("Failed to get shares to receive.");
      if (amount == null) throw new Error("Amount is not defined.");

      /* ------------ */
      /*   Mutation   */
      /* ------------ */
      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: strategy?.address,
          abi: loopStrategyAbi,
          functionName: "deposit",
          args: [amount, address, sharesToReceive],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to deposit a ILMv1 strategy", error);

      showNotification({
        status: "error",
        content: `Failed to deposit to a ILMv1 strategy: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
