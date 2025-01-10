import { SeamlessWriteAsyncParams, useSeamlessSendTransaction } from "@shared";
import { encodeFunctionData } from "viem";
import { useAccount } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { MappedVaultData } from "../types/MappedFullVaultData";
import { BundlerAction } from "@morpho-org/morpho-blue-bundlers/pkg";
import { BundlerAbi } from "../../../../../abis/BundlerAbi";
import { MORPHO_BundlerV2_ADDRESS } from "../../../../meta";

export const useMutateDepositMorphoVault = (vault?: MappedVaultData) => {
  // meta data
  const { address } = useAccount();

  // cache data
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(vault?.asset.address);
  const { queryKeys: assetAllowanceQK } = useFetchAssetAllowance({
    asset: vault?.asset.address,
    spender: MORPHO_BundlerV2_ADDRESS,
  });

  // hook call
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [
      ...((accountAssetBalanceQK ?? []) as QueryKey[]),
      ...((assetAllowanceQK ?? []) as QueryKey[]),
    ],
  });

  // mutation wrapper
  const depositAsync = async (
    // ui arguments
    args: {
      amount: bigint | undefined;
      sharesToReceive: bigint;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    if (!vault?.vaultAddress) {
      // eslint-disable-next-line no-console
      console.warn("vault address is undefined.");
      return;
    }
    if (!args.amount) {
      // eslint-disable-next-line no-console
      console.warn("amount is undefined.");
      return;
    }

    try {
      const data = encodeFunctionData({
        abi: BundlerAbi,
        functionName: "multicall",
        args: [
          [
            BundlerAction.erc20TransferFrom(vault.asset.address, args.amount),
            // todo shares ?
            BundlerAction.erc4626Deposit(
              vault.vaultAddress,
              args.amount,
              args.sharesToReceive,
              address as string
            ) as any,
          ],
        ],
      });

      await sendTransactionAsync(
        {
          to: MORPHO_BundlerV2_ADDRESS,
          data,
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to deposit to morpho vault", error);
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
