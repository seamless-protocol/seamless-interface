import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { useSeamlessContractRead } from "../../../../shared";

export const useFetchBalanceOf = (asset: Address) => {
  const account = useAccount();
  const { data: balance, ...rest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });

  return {
    balance,
    ...rest,
  };
};
