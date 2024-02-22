import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { walletBalanceDecimalsOptions } from "@meta";

export const useFetchAccountAssetBalance = (asset: Address) => {
  const account = useAccount();

  const { data: balance } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
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
  };
};
