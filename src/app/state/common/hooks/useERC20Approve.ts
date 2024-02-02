import { useState, useCallback, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Address, erc20Abi, maxUint256 } from "viem";
import { useQueryClient } from "@tanstack/react-query";

const ALWAYS_APPROVE_MAX = false;

/**
 * Custom hook to manage ERC-20 token approval process in Ethereum-based networks.
 *
 * This hook abstracts the logic to check if a spender is already approved to spend a specific amount of tokens on behalf of the token owner.
 * If the spender is not approved or the approved amount is below a certain threshold, the hook provides a method to approve the spender.
 *
 * @param {Address} tokenAddress - The Ethereum address of the ERC-20 token contract.
 * @param {Address} spenderAddress - The Ethereum address of the spender contract or account to approve.
 * @param {bigint} [threshold=parseUnits(0)] - The minimum amount of tokens that should be approved for the spender. Defaults to 0.
 * @returns {Object} An object containing the approval state (`isApproved`), whether an approval transaction is in progress (`isApproving`),
 * a method to trigger the approval process (`approveAsync`), and a method to check the current approval status (`checkApproval`).
 *
 * @example
 * const { isApproved, isApproving, approveAsync, checkApproval } = useERC20Approve(tokenAddress, spenderAddress, BigInt(1000));
 *
 * useEffect(() => {
 *   checkApproval();
 * }, [checkApproval]);
 *
 * const handleApprove = async () => {
 *   await approveAsync(parseUnits(2000));
 * };
 */
export const useERC20Approve = (
  tokenAddress: Address,
  spenderAddress: Address,
  threshold: bigint = BigInt(0)
) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync: approveTokenAsync, isPaused: isApproving } =
    useWriteContract();

  const { data: allowance, queryKey } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address as Address, spenderAddress],
  });

  const checkApproval = useCallback(async () => {
    console.log({ allowance });
    console.log({ threshold });
    if (allowance && allowance >= threshold) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [allowance, threshold]);

  useEffect(() => {
    checkApproval();
  }, [checkApproval]);

  const approveAsync = useCallback(
    async (amount: bigint | undefined) => {
      setIsLoading(true);

      const amountToApprove = ALWAYS_APPROVE_MAX ? maxUint256 : amount || 0n;

      try {
        await approveTokenAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [spenderAddress, amountToApprove],
        });
        queryClient.invalidateQueries({ queryKey });
      } catch (e) {
        console.log({ e });
      } finally {
        setIsLoading(false);
      }
    },
    [approveTokenAsync, queryClient, queryKey, spenderAddress, tokenAddress]
  );

  return {
    isApproved,
    isApproving: isLoading || isApproving,
    approveAsync,
    checkApproval,
  };
};
