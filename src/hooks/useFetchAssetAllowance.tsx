import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  loopStrategyAddress,
  useReadCbEthAllowance,
} from "../generated/generated";
import { useEffect } from "react";

export const useFetchAssetAllowance = (
  isApprovalSuccessful: boolean,
  isDepositSuccessful: boolean
) => {
  const queryClient = useQueryClient();
  const account = useAccount();

  const { data: allowance, queryKey } = useReadCbEthAllowance({
    args: [account.address as `0x${string}`, loopStrategyAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [isApprovalSuccessful, isDepositSuccessful, queryClient]);

  return { allowance };
};
