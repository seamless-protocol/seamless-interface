import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Address, erc20Abi } from "viem";
import { useAccount } from "wagmi";
import { walletBalanceDecimalsOptions } from "@meta";
import { useSeamlessContractRead } from "../../../../shared/wagmi-wrapper/hooks/useSeamlessContractRead";

export const KEY_AccountAsset_Balance = "KEY_AccountAsset_Balance";

export const useFetchAccountAssetBalance = (asset: Address) => {
  const account = useAccount();

  const { data: balance } = useSeamlessContractRead(
    {
      address: asset,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account.address as `0x${string}`],
    },
    KEY_AccountAsset_Balance
  );

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
