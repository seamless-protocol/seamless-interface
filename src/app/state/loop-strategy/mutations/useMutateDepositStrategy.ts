import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";

export const useMutateDepositStrategy = (id: number) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(
    ilmStrategies[id].underlyingAsset.address
  );

  // hook call
  const { seamlessWriteAsync, ...rest } = useSeamlessContractWrite(
    {
      address: ilmStrategies[id].address,
      abi: loopStrategyAbi,
      functionName: "deposit",
    },
    // array of query keys to invalidate, when mutation happens!
    [accountAssetBalanceQK]
  );

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
    await seamlessWriteAsync(
      {
        // ui -> contract arguments
        args: [
          parseUnits(args.amount, 18),
          address as Address,
          args.sharesToReceive,
        ],
      },
      { ...settings }
    );
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
