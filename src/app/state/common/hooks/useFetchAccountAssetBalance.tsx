import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { walletBalanceDecimalsOptions } from "@meta";
import { useSeamlessContractRead } from "../../../../shared/wagmi-wrapper/hooks/useSeamlessContractRead";

export const useFetchAccountAssetBalance = (asset: Address) => {
  const account = useAccount();

  const { data: balance, ...rest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
    query: {
      staleTime: Infinity,
      refetchInterval: 1_000,
    },
  });

  return {
    balance: formatFetchBigIntToViewBigInt(
      {
        bigIntValue: balance || 0n,
        symbol: "",
        decimals: 18,
      },
      walletBalanceDecimalsOptions
    ),
    ...rest,
  };
};
