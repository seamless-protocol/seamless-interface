import { SeamlessWriteAsyncParams, useSeamlessContractWrite, useToken } from "@shared";
import { lendingPoolConfig } from "@generated";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";

export const useMutateSupplyLending = (asset: Address) => {
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
  const supplyAsync = async (
    args: {
      amount: string;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    await writeContractAsync(
      {
        ...lendingPoolConfig,
        functionName: "supply",
        // Referral supply is currently inactive, you can pass 0 as referralCode.
        // This program may be activated in the future through an Aave governance proposal
        args: [asset, parseUnits(args.amount, decimals), address as Address, 0],
      },
      { ...settings }
    );
  };

  return { ...rest, isSupplyPending: rest.isPending, supplyAsync };
};
