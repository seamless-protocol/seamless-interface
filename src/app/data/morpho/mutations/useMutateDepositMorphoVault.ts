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
import { setupBundle } from "../simulation/setupBundle";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";
import { fetchSimulationState } from "../simulation/fetchSimulationState";
import { getHookFetchUserVaultPositionsQueryKey } from "../user-vault-positions/UserVaultPositions.hook";
import { useState } from "react";
import { getFormattedAssetBalanceUsdValueQueryKey } from "../../common/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.fetch";
import { getHookFetchFormattedAssetBalanceWithUsdValueQueryKey } from "../../common/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";
import { InputBundlerOperation } from "@morpho-org/bundler-sdk-viem";
import { targetChain } from "../../../config/rainbow.config";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { getFetchViewMaxUserDepositQueryKey } from "../../common/hooks/FetchMaxUserDeposit/useFetchViewMaxUserDeposit.hook";

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
  const underlyingAsset = fullVaultData?.vaultData.vaultByAddress.address;

  /* -------------------- */
  /*   Query cache keys   */
  /* -------------------- */
  const { queryKeys: accountAssetBalanceQK } = useFetchAssetBalance(underlyingAsset);
  const { queryKey: assetAllowanceQK } = useFetchAssetAllowance({
    asset: underlyingAsset,
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
      getFormattedAssetBalanceUsdValueQueryKey(address, underlyingAsset),
      getHookFetchFormattedAssetBalanceWithUsdValueQueryKey(address, underlyingAsset),
      getHookFetchUserVaultPositionsQueryKey(address),
      getFetchViewMaxUserDepositQueryKey(vaultAddress, address),
    ],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const depositAsync = async (
    // ui arguments
    args: {
      amount: bigint | undefined;
      depositNativeETH?: boolean;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      setIsSimulating(true);

      if (!vaultAddress) throw new Error("Vault address is not found. Please try again later.");
      if (!args.amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please try again later.");

      const assetAddress = fullVaultData?.vaultData.vaultByAddress.asset.address;
      const tokens = args.depositNativeETH
        ? [NATIVE_ADDRESS, assetAddress, vaultAddress]
        : [assetAddress, vaultAddress];

      const simulationState = await fetchSimulationState({
        marketIds:
          fullVaultData?.vaultData.vaultByAddress?.state?.allocation?.map((alloc) => alloc.market.uniqueKey) ?? [],
        users: [address, bundler, vaultAddress],
        tokens,
        vaults: [vaultAddress],
      });
      if (!simulationState) throw new Error("Simulation failed. Please try again later.");

      const wrapOperation: InputBundlerOperation = {
        type: "Erc20_Wrap",
        sender: address as Address,
        address: assetAddress,
        args: {
          amount: args.amount,
          owner: address as Address,
          slippage: DEFAULT_SLIPPAGE_TOLERANCE,
        },
      };
      const depositOperation: InputBundlerOperation = {
        type: "MetaMorpho_Deposit",
        sender: address as Address,
        address: vaultAddress,
        args: {
          assets: args.amount,
          owner: address as Address,
          slippage: DEFAULT_SLIPPAGE_TOLERANCE,
        },
      };
      const operations: InputBundlerOperation[] = args.depositNativeETH
        ? [wrapOperation, depositOperation]
        : [depositOperation];

      const txs = await setupBundle(account, simulationState, operations);

      for (const tx of txs) {
        await sendTransactionAsync({ ...tx, chainId: targetChain.id }, { ...settings });
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
