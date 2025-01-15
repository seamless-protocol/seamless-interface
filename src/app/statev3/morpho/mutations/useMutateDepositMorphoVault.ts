import { SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { Address } from "viem";
import { useAccount, useBlock } from "wagmi";
import {
  ChainId,
  DEFAULT_SLIPPAGE_TOLERANCE,
  getChainAddresses as getMorphoChainAddresses,
} from "@morpho-org/blue-sdk";
import { useSimulationState } from "@morpho-org/simulation-sdk-wagmi";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { setupBundle } from "./setupBundle";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";

export const useMutateDepositMorphoVault = (vaultAddress?: Address, amount?: bigint) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { data: block } = useBlock({
    query: {
      staleTime: 60_000,
    },
  });
  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);
  const { showNotification } = useNotificationContext();

  /* ------------- */
  /*   Vault data  */
  /* ------------- */
  const { data: fullVaultData } = useFetchRawFullVaultInfo(vaultAddress);
  const marketIds = fullVaultData?.vaultByAddress?.state?.allocation?.map((alloc) => alloc.market.uniqueKey) ?? [];

  /* ------------- */
  /*   Simulation  */
  /* ------------- */
  const {
    data: simulationState,
    isPending: isSimulating,
    isFetchingAny,
  } = useSimulationState({
    marketIds,
    users: [address, bundler, vaultAddress],
    tokens: [fullVaultData?.vaultByAddress.asset.address, vaultAddress],
    vaults: [vaultAddress],
    block,
    chainId: ChainId.BaseMainnet,
    query: {
      enabled: !!block && !!fullVaultData && !!address && !!vaultAddress && !!amount,
    },
  });

  /* -------------------- */
  /*   Query cache keys   */
  /* -------------------- */
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(fullVaultData?.vaultByAddress?.asset.address);
  const { queryKeys: assetAllowanceQK } = useFetchAssetAllowance({
    asset: fullVaultData?.vaultByAddress?.asset.address,
    spender: bundler,
  });

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [
      ...((accountAssetBalanceQK ?? []) as QueryKey[]),
      ...((assetAllowanceQK ?? []) as QueryKey[]),
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const depositAsync = async (
    // ui arguments
    args: {
      amount: bigint | undefined;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      if (!vaultAddress) throw new Error("Vault address is not found. Please try again later.");
      if (!args.amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!simulationState) throw new Error("Simulation could not be found. Please try again later.");
      if (!address) throw new Error("Account address is not found. Please try again later.");

      const txs = setupBundle(address, simulationState, [
        {
          type: "MetaMorpho_Deposit",
          sender: address as Address,
          address: vaultAddress,
          args: {
            assets: args.amount,
            owner: address as Address,
            slippage: DEFAULT_SLIPPAGE_TOLERANCE,
          },
        },
      ]);

      await txs.reduce<Promise<void>>(async (prevPromise, tx) => {
        await prevPromise;
        await sendTransactionAsync(
          {
            to: bundler,
            data: tx.data as any,
          },
          { ...settings }
        );
      }, Promise.resolve());
    } catch (error) {
      console.error("Failed to deposit to morpho vault", error);
      showNotification({
        status: "error",
        content: `Failed to deposit to morpho vault: ${error}`,
      });
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync, isLoading: isSimulating || isFetchingAny };
};
