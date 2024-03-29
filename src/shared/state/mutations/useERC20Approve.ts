import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Address, erc20Abi, maxUint256 } from "viem";
import { useSeamlessContractWrite } from "../../wagmi-wrapper/hooks/useSeamlessContractWrite";

const ALWAYS_APPROVE_MAX = false;

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
  const { address } = useAccount();
  const [isApproved, setIsApproved] = useState(false);

  const { data: allowance, queryKey } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address as Address, spenderAddress],
  });

  const { writeContractAsync: approveTokenAsync, isPending } = useSeamlessContractWrite({
    queriesToInvalidate: [queryKey],
  });

  useEffect(() => {
    if (allowance && allowance >= amount) {
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
    });
  };

  return {
    isApproved,
    isApproving: isPending,
    approveAsync,
  };
};
