import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

export const useFetchAccountAssetBalance = (
  asset: Address,
  isDepositSuccessful: boolean
) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: balance, queryKey } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isDepositSuccessful, queryClient]);

  return {
    balance: formatFetchBigIntToViewBigInt({
      bigIntValue: balance || 0n,
      symbol: "",
      decimals: 18,
    }),
  };
};
