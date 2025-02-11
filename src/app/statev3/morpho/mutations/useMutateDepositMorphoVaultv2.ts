import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessSendTransaction } from "@shared";
import { Address } from "viem";
import { useAccount } from "wagmi";
import {
  ChainId,
  DEFAULT_SLIPPAGE_TOLERANCE,
  getChainAddresses as getMorphoChainAddresses,
  NATIVE_ADDRESS,
} from "@morpho-org/blue-sdk";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { setupBundle } from "../simulation/setupBundle";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";
import { fetchSimulationState } from "../simulation/fetchSimulationState";
import { getHookFetchUserVaultPositionsQueryKey } from "../user-vault-positions/UserVaultPositions.hook";
import { useState } from "react";
import { getFormattedAssetBalanceUsdValueQueryKey } from "../../queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.fetch";
import { getHookFetchFormattedAssetBalanceWithUsdValueQueryKey } from "../../queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";

export const useMutateDepositMorphoVault = (vaultAddress?: Address) => {
  /* ------------- */
  /*   Local state */
  /* ------------- */
  const [isSimulating, setIsSimulating] = useState(false);

  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const account = useAccount();
  const { address } = account;
  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);
  const { showNotification } = useNotificationContext();

  /* ------------- */
  /*   Vault data  */
  /* ------------- */
  const { data: fullVaultData } = useFetchRawFullVaultInfo(vaultAddress);

  /* -------------------- */
  /*   Query cache keys   */
  /* -------------------- */
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(
    fullVaultData?.vaultData.vaultByAddress?.asset.address
  );
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: fullVaultData?.vaultData.vaultByAddress?.asset.address,
    spender: bundler,
  });

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { sendTransactionAsync, ...rest } = useSeamlessSendTransaction({
    // array of query keys to invalidate, when mutation happens!
    queriesToInvalidate: [
      ...((accountAssetBalanceQK ?? []) as QueryKey[]),
      assetAllowanceQK,
      getFormattedAssetBalanceUsdValueQueryKey(address, fullVaultData?.vaultData.vaultByAddress.address),
      getHookFetchFormattedAssetBalanceWithUsdValueQueryKey(address, fullVaultData?.vaultData.vaultByAddress.address),
      getHookFetchUserVaultPositionsQueryKey(address),
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
      isWrapping?: boolean;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      setIsSimulating(true);

      if (!vaultAddress) throw new Error("Vault address is not found. Please try again later.");
      if (!args.amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please try again later.");

      const wrappedTokenAddress = fullVaultData?.vaultData.vaultByAddress.asset.address;
      const simulationTokens = args.isWrapping ? [NATIVE_ADDRESS, wrappedTokenAddress] : [wrappedTokenAddress];

      const simulationState = await fetchSimulationState({
        marketIds:
          fullVaultData?.vaultData.vaultByAddress?.state?.allocation?.map((alloc) => alloc.market.uniqueKey) ?? [],
        users: [address, bundler, vaultAddress],
        tokens: simulationTokens,
        vaults: [vaultAddress],
      });
      if (!simulationState) throw new Error("Simulation failed. Please try again later.");

      const txs = await setupBundle(
        account,
        simulationState,
        args.isWrapping
          ? [
              {
                type: "Erc20_Wrap",
                sender: address as Address,
                address: wrappedTokenAddress,
                args: {
                  amount: args.amount,
                  owner: address as Address,
                  slippage: DEFAULT_SLIPPAGE_TOLERANCE,
                },
              },
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
            ]
          : [
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
            ]
      );

      for (const tx of txs) {
        const txRequest: { to: Address; data: any; value?: bigint } = {
          to: bundler,
          data: tx.data as any,
        };

        // Only add ETH value for the wrap transaction
        if (args.isWrapping) {
          txRequest.value = args.amount;
        }

        await sendTransactionAsync(txRequest, { ...settings });
      }
    } catch (error) {
      console.error("Failed to deposit to a vault", error);
      showNotification({
        status: "error",
        content: `Failed to deposit to a vault: ${getParsedError(error)}`,
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return { ...rest, isDepositPending: rest.isPending || isSimulating, depositAsync };
};
