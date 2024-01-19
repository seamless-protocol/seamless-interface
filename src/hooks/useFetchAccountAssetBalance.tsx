import { useAccount, useReadContract } from "wagmi";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { erc20Abi } from "viem";

export const useFetchAccountAssetBalance = (
  assset: `0x${string}`,
  isDepositSuccessful: boolean
) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: balance, queryKey } = useReadContract({
    address: assset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isDepositSuccessful, queryClient]);

  return {
    balance,
  };
};
