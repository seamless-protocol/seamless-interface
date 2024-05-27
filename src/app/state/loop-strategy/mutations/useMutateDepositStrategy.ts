import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";

export const useMutateDepositStrategy = (id: number, subStrategyAddress: Address) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(ilmStrategies[id].underlyingAsset.address);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: ilmStrategies[id].underlyingAsset.address,
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
      amount: string;
      sharesToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    // todo: bugfix fetch sharesToReceive here instead of using it from props to avoid race condition bug.
    await writeContractAsync(
      {
        // ui -> contract arguments
        address: subStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "deposit",
        args: [parseUnits(args.amount, 18), address as Address, args.sharesToReceive],
      },
      { ...settings }
    );
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
