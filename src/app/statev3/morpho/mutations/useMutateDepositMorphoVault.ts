import { SeamlessWriteAsyncParams, useSeamlessSendTransaction } from "@shared";
import { Address } from "viem";
import { useAccount, useBlock } from "wagmi";
import { useFetchAssetAllowance } from "../../../../shared/state/queries/useFetchAssetAllowance";
import { QueryKey } from "@tanstack/react-query";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { MappedVaultData } from "../types/MappedFullVaultData";
import { encodeBundle } from "@morpho-org/bundler-sdk-viem";
import { ChainId, MarketId, addresses } from "@morpho-org/blue-sdk";
import { useSimulationState } from "@morpho-org/simulation-sdk-wagmi";
import { useFetchRawFullVaultInfo } from "../full-vault-info/FullVaultInfo.hook";

export const useMutateDepositMorphoVault = (vault?: MappedVaultData) => {
  // meta data
  const { data: fullVaultData } = useFetchRawFullVaultInfo(vault?.vaultAddress);
  const { address } = useAccount();
  const { data: block } = useBlock();
  const { bundler, wNative } = addresses[ChainId.BaseMainnet];

  // .uniqueKey or .id?
  const marketIds = fullVaultData?.vaultByAddress.state?.allocation?.map((alloc) => alloc.market.uniqueKey) || [];

  const { data: simulationState } = useSimulationState({
    marketIds: marketIds as MarketId[],
    users: [address, bundler],
    tokens: [vault?.asset.address, wNative], // todo what is wNative?
    vaults: [vault?.vaultAddress],
    block,
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

    try {
      console.log("encodeBundle");
      const data = encodeBundle(
        [
          {
            address: vault.asset.address,
            sender: address as Address,
            type: "Erc20_Transfer",
            args: {
              amount: args.amount,
              from: address as Address,
              to: bundler,
            },
          },
          {
            address: vault.vaultAddress,
            sender: address as Address,
            type: "MetaMorpho_Deposit",
            args: {
              owner: address as Address,
              assets: args.amount,
            },
          },
        ],
        simulationState
      );
      console.log({ data });

      // encodeOperation
      // const data = encodeFunctionData({
      //   abi: morphoBundlerV2Abi,
      //   functionName: "multicall",
      //   args: [
      //     [
      //       // permit
      //       // wrap
      //       BundlerAction.erc20TransferFrom(vault.asset.address, args.amount),
      //       // todo shares ?
      //       BundlerAction.erc4626Deposit(
      //         vault.vaultAddress,
      //         args.amount,
      //         args.sharesToReceive,
      //         address as string
      //       ) as any,
      //     ],
      //   ],
      // });

      await sendTransactionAsync(
        {
          to: bundler,
          data: data as any,
        },
        { ...settings }
      );
    } catch (error) {
      console.error("Failed to deposit to morpho vault", error);
    }
  };

  return { ...rest, isDepositPending: rest.isPending, depositAsync };
};
