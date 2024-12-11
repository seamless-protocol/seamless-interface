import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { StrategyState } from "../../../statev3/common/types/StateTypes";
import { useFetchAssetBalance } from "../../../statev3/common/queries/useFetchViewAssetBalance";

export const useMutateDepositStrategy = (strategy?: StrategyState, subStrategyAddress?: Address) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(strategy?.underlyingAsset.address);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: strategy?.underlyingAsset.address,
    spender: subStrategyAddress,
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
    if (!subStrategyAddress) {
      // eslint-disable-next-line no-console
      console.warn("subStrategyAddress is undefined.");
      return;
    }

    await writeContractAsync(
      {
        // ui -> contract arguments
        address: subStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "deposit",
        args: [args.amount!, address as Address, args.sharesToReceive],
      },
      { ...settings }
    );
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
