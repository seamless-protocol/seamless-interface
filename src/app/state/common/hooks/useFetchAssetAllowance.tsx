import { useQueryClient } from "@tanstack/react-query";
import { useAccount, useReadContract } from "wagmi";
import { loopStrategyAddress } from "../../../generated/generated";
import { useEffect } from "react";
import { erc20Abi } from "viem";

export const useFetchAssetAllowance = (
  asset: `0x${string}`,
  isApprovalSuccessful: boolean,
  isDepositSuccessful: boolean
) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: allowance, queryKey } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address as `0x${string}`, loopStrategyAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isApprovalSuccessful, isDepositSuccessful]);

  return { allowance };
};
