import { SeamlessWriteAsyncParams, useSeamlessContractWrite, useToken } from "@shared";
import { lendingPoolConfig } from "@generated";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchUserAccountData } from "../queries/useFetchViewUserAccountData";

export const useMutateSupplyLending = (asset?: Address) => {
  // meta data
  const { address } = useAccount();

  const {
    data: { decimals },
  } = useToken(asset);

  // cache data
  const { queryKey: accountAssetBalanceQK } = useFetchAssetBalance(asset);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset,
    spender: lendingPoolConfig.address,
  });
  const { queryKey: userAccountDataQK } = useFetchUserAccountData();

  // hook call
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [accountAssetBalanceQK, assetAllowanceQK, userAccountDataQK],
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
        args: [asset!, decimals ? parseUnits(args.amount, decimals) : undefined!, address as Address, 0],
      },
      { ...settings }
    );
  };

  return { ...rest, isSupplyPending: rest.isPending, supplyAsync };
};
