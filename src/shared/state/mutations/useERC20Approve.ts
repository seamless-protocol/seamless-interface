import { useState, useEffect } from "react";
import { Address, erc20Abi, maxUint256 } from "viem";
import { useSeamlessContractWrite } from "../../wagmi-wrapper/hooks/useSeamlessContractWrite";
import { useFetchAssetAllowance } from "../queries/useFetchAssetAllowance";

const ALWAYS_APPROVE_MAX = false;

/**
 * Helper function to determine human readable state of approve.
 *
 * @param {boolean} isApproved - Indicates if the approval is already done.
 * @param {boolean} justApproved - Indicates if the user has just approved.
 * @return {string} - The appropriate button text.
 */

export function getApproveState(isApproved?: boolean, justApproved?: boolean) {
  if (isApproved) {
    return justApproved ? "Approve Confirmed" : "Approved";
  }
  return "Approve";
}

/**
 * Custom hook for approving ERC20 token transfers.
 *
 * This hook provides functionality for approving ERC20 token transfers, checking the current allowance, and handling the approval transaction using Wagmi.
 *
 * @param {Address} tokenAddress - The address of the ERC20 token contract.
 * @param {Address} spenderAddress - The address of the spender to approve the transfer to.
 * @param {bigint} [amount=BigInt(0)] - The amount of tokens to approve for transfer. Defaults to 0.
 * @returns {Object} Object containing the following properties:
 * - {boolean} isApproved - Indicates whether the spender is already approved to transfer the specified amount of tokens.
 * - {boolean} isApproving - Indicates whether an approval transaction is currently pending.
 * - {Function} approveAsync - Function to trigger the approval transaction.
 */

export const useERC20Approve = (tokenAddress: Address, spenderAddress: Address, amount: bigint = BigInt(0)) => {
  const [isApproved, setIsApproved] = useState(false);
  const [justApproved, setJustApproved] = useState(false);

  const { data: allowance, queryKey } = useFetchAssetAllowance({
    asset: tokenAddress,
    spender: spenderAddress,
  });

  const { writeContractAsync: approveTokenAsync, isPending } = useSeamlessContractWrite({
    queriesToInvalidate: [queryKey],
  });

  useEffect(() => {
    if (allowance && allowance.bigIntValue >= amount) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [allowance, amount]);

  const approveAsync = async () => {
    const amountToApprove = ALWAYS_APPROVE_MAX ? maxUint256 : amount;

    await approveTokenAsync({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, amountToApprove],
    }, {
      onSuccess: () => {
        setJustApproved(true);
      }
    });
  };

  return {
    isApproved,
    isApproving: isPending,
    justApproved,
    approveAsync,
  };
};
