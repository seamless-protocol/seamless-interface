import { useAccount } from "wagmi";
import { useReadCbEthBalanceOf } from "../generated/generated";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useFetchAccountAssetBalance = (isDepositSuccessful: boolean) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: balance, queryKey } = useReadCbEthBalanceOf({
    args: [account.address as `0x${string}`],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isDepositSuccessful, queryClient]);

  return {
    balance,
  };
};
