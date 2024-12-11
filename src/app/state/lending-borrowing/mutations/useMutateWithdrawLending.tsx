import { SeamlessWriteAsyncParams, useSeamlessContractWrite, useToken } from "@shared";
import { lendingPoolConfig } from "@generated";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../../statev3/common/queries/useFetchViewAssetBalance";

export const useMutateWithdrawLending = (asset?: Address) => {
  // meta data
  const { address } = useAccount();

  const {
    data: { decimals },
  } = useToken(asset);

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(asset);

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [accountAssetBalanceQK],
  });

  // mutation wrapper
  const withdrawAsync = async (
    args: {
      amount: string;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!address) {
      // eslint-disable-next-line no-console
      console.warn(`Address is not  defined! useMutateWithdrawLending`);
      return;
    }
    if (!asset) {
      // eslint-disable-next-line no-console
      console.warn(`asset is not  defined! useMutateWithdrawLending`);
      return;
    }
    if (!decimals) {
      // eslint-disable-next-line no-console
      console.warn("decimals are undefined at useMutateWithdrawLending!");
      return;
    }

    await writeContractAsync(
      {
        ...lendingPoolConfig,
        functionName: "withdraw",
        args: [asset, parseUnits(args.amount, decimals), address],
      },
      { ...settings }
    );
  };

  return { ...rest, isWithdrawPending: rest.isPending, withdrawAsync };
};
