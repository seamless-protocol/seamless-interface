import { SeamlessWriteAsyncParams, useSeamlessSendTransaction } from "@shared";
import { Address } from "viem";
import { useAccount, useBlock } from "wagmi";
import { MappedVaultData } from "../types/MappedFullVaultData";
import { ChainId, addresses } from "@morpho-org/blue-sdk";
import { useSimulationState } from "@morpho-org/simulation-sdk-wagmi";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { setupBundle } from "./setupBundle";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";

export const useMutateDepositMorphoVault = (vault?: MappedVaultData) => {
  // meta data
  const { data: fullVaultData } = useFetchRawFullVaultInfo(vault?.vaultAddress);
  const { address } = useAccount();
  const { data: block } = useBlock();
  const { bundler } = addresses[ChainId.BaseMainnet];

  const marketIds = fullVaultData?.vaultByAddress?.state?.allocation?.map((alloc) => alloc.market.uniqueKey) ?? [];

  // console.log({ marketIds });
  const { data: simulationState } = useSimulationState({
    marketIds,
    // marketIds: [],
    users: [address, bundler, vault?.vaultAddress],
    tokens: [vault?.asset.address, vault?.vaultAddress],
    vaults: [vault?.vaultAddress],
    block,
    chainId: ChainId.BaseMainnet,
  });

  // cache data
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(vault?.asset.address);
  const { queryKeys: assetAllowanceQK } = useFetchAssetAllowance({
    asset: vault?.asset.address,
    spender: bundler,
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
    if (!simulationState) {
      // eslint-disable-next-line no-console
      console.warn("Simulation state is undefined.");
      return;
    }
    if (!address) {
      // eslint-disable-next-line no-console
      console.warn("Address is undefined.");
      return;
    }

    try {
      const txs = await setupBundle(address, simulationState, [
        {
          type: "MetaMorpho_Deposit",
          sender: address as Address,
          address: vault.vaultAddress,
          args: {
            assets: args.amount,
            owner: address as Address,
            slippage: undefined,
          },
        },
      ]);

      console.log({ txs });

      txs.forEach(async (tx) => {
        await sendTransactionAsync(
          {
            to: bundler,
            data: tx.data as any,
          },
          { ...settings }
        );
      });
    } catch (error) {
      console.error("Failed to deposit to morpho vault", error);
    }
  };

  return { ...rest, isDepositPending: false, depositAsync };
};
