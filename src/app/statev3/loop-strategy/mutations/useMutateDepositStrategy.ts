import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchAssetBalance } from "../../../state/common/queries/useFetchViewAssetBalance";
import { StrategyState } from "../../../state/common/types/StateTypes";

export const useMutateDepositStrategy = (strategy?: StrategyState) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(strategy?.underlyingAsset.address);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: strategy?.underlyingAsset.address,
    spender: strategy?.address,
  });

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [accountAssetBalanceQK, assetAllowanceQK], // array of query keys to invalidate, when mutation happens!
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
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
