import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { FullStrategyData } from "../../metadata/FullStrategyData.all";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetBalance } from "../../../state/common/queries/useFetchViewAssetBalance";

export const useMutateDepositStrategy = (strategy?: FullStrategyData) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(strategy?.underlying);
  const { queryKeys: assetAllowanceQK } = useFetchAssetAllowance({
    asset: strategy?.underlying,
    spender: strategy?.address,
  });

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [
      ...((accountAssetBalanceQK ?? []) as QueryKey[]),
      ...((assetAllowanceQK ?? []) as QueryKey[]),
    ],
  });

  // mutation wrapper
  const depositAsync = async (
    // ui arguments
    args: {
      amount: bigint | undefined;
      sharesToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!strategy?.address) {
      // eslint-disable-next-line no-console
      console.warn("strategy address is undefined.");
      return;
    }

    try {
      await writeContractAsync(
        {
          // ui -> contract arguments
          address: strategy?.address,
          abi: loopStrategyAbi,
          functionName: "deposit",
          args: [args.amount!, address as Address, args.sharesToReceive],
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to deposit", error);
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
