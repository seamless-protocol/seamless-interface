import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { loopStrategyAbi } from "@generated";
import { ilmStrategies } from "../config/StrategyConfig";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAccountAssetBalance } from "../../common/hooks/useFetchAccountAssetBalance";
import { useFetchViewUserInfo } from "../hooks/useFetchViewUserInfo";

export const useMutateDepositStrategy = (id: number, assetAddress: Address) => {
  //meta data
  const { address } = useAccount();

  //cache data
  const { queryKey: acountAssetBalanceQK } =
    useFetchAccountAssetBalance(assetAddress);
  const { queryKey: ViewUserInfoKQ } = useFetchViewUserInfo(id);

  //hook call
  const { seamlessWriteAsync, ...rest } = useSeamlessContractWrite(
    {
      address: ilmStrategies[id].address,
      abi: loopStrategyAbi,
      functionName: "deposit",
    },
    //array of query keys to invalidate, when mutation happens!
    [acountAssetBalanceQK, ViewUserInfoKQ]
  );

  //mutation wrapper
  const depositAsync = async (
    args: {
      amount: string;
      sharesToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    // fetch sharesToReceive here instead of using it from props to avoid race condition bug.
    await seamlessWriteAsync(
      {
        args: [
          parseUnits(args.amount, 18),
          address as Address,
          args.sharesToReceive,
        ],
      },
      { ...settings }
    );
  };

  return { ...rest, depositAsync };
};
