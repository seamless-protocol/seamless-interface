import { useWriteContract } from "wagmi";
import { Address, erc20Abi } from "viem";

export const useWriteAssetApprove = (asset: Address) => {
  const { isPending, isSuccess, writeContract } = useWriteContract();

  return {
    isPending,
    isSuccess,
    approve: async (spender: Address, amount: bigint) => {
      writeContract({
        address: asset,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, amount],
      });
    },
  };
};
