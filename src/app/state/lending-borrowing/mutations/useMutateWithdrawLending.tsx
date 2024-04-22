import { SeamlessWriteAsyncParams, useSeamlessContractWrite, useToken } from "@shared";
import { lendingPoolConfig } from "@generated";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";

export const useMutateWithdrawLending = (asset: Address) => {
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
