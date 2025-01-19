import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { Address } from "viem";
import { useAccount } from "wagmi";
import {
  ChainId,
  DEFAULT_SLIPPAGE_TOLERANCE,
  getChainAddresses as getMorphoChainAddresses,
} from "@morpho-org/blue-sdk";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { setupBundle } from "../simulation/setupBundle";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";
import { fetchSimulationState } from "../simulation/fetchSimulationState";
import { getFormattedAssetBalanceUsdValueQueryKey } from "../../queries/AssetBalanceWithUsdValue.hook";
import {
  getFetchUserVaultPositionsQueryKey,
  useFetchUserVaultPositions,
} from "../user-vault-positions/UserVaultPositions.hook";
import { base } from "viem/chains";
import { whiteListedMorphoVaults } from "../../../../meta";

export const useMutateDepositMorphoVault = (vaultAddress?: Address) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const account = useAccount();
  const { address } = account;
  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);
  const { showNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  /* ------------- */
  /*   Vault data  */
  /* ------------- */
  const { data: fullVaultData } = useFetchRawFullVaultInfo(vaultAddress);
  const { data: userVaultPositions } = useFetchUserVaultPositions();

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
      getFormattedAssetBalanceUsdValueQueryKey(address, fullVaultData?.vaultByAddress.address),
    ],
    hideDefaultErrorOnNotification: true,
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
      if (!address) throw new Error("Account address is not found. Please try again later.");

      const simulationState = await fetchSimulationState({
        marketIds: fullVaultData?.vaultByAddress?.state?.allocation?.map((alloc) => alloc.market.uniqueKey) ?? [],
        users: [address, bundler, vaultAddress],
        tokens: [fullVaultData?.vaultByAddress.asset.address, vaultAddress],
        vaults: [vaultAddress],
      });
      if (!simulationState) throw new Error("Simulation failed. Please try again later.");

      const txs = await setupBundle(account, simulationState, [
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

      for (const tx of txs) {
        await sendTransactionAsync(
          {
            to: bundler,
            data: tx.data as any,
          },
          { ...settings }
        );
      }

      // todo: fix this properly
      if (
        !userVaultPositions?.vaultPositions.find((pos) => pos.vaultPosition.baseData.vault.address === vaultAddress)
      ) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: getFetchUserVaultPositionsQueryKey(address as string, whiteListedMorphoVaults, base.id),
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to deposit to morpho vault", error);
      showNotification({
        status: "error",
        content: `Failed to deposit to morpho vault: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
