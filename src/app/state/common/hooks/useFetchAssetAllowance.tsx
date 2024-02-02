import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useReadContract } from "wagmi";
import { useEffect } from "react";
import { Address, erc20Abi } from "viem";

export const useFetchAssetAllowance = (
  asset: Address,
  spender: Address,
  isApprovalSuccessful: boolean,
  isDepositSuccessful: boolean
) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: allowance, queryKey } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address as Address, spender],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isApprovalSuccessful, isDepositSuccessful]);

  return { allowance };
};
