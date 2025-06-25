import { getConfig } from "@app/utils/queryContractUtils";
import { leverageRouterAbi, leverageRouterAddress } from "@generated";
import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { Address, parseEventLogs } from "viem";
import { useAccount } from "wagmi";
import { getPublicClient, simulateContract } from "wagmi/actions";
import { LeverageManagerAbi } from "../../../../../abis/LeverageManager";
import { LeverageRouterAbi } from "../../../../../abis/LeverageRouter";
import { config, targetChain } from "../../../config/rainbow.config";
import { SwapContext } from "../hooks/useFetchAerodromeRoute";

export const getRedeemedShares = async (txHash: `0x${string}`) => {
  const client = getPublicClient(config);
  const { logs } = await client.getTransactionReceipt({ hash: txHash });

  const parsedLogs = parseEventLogs({
    abi: LeverageManagerAbi,
    eventName: "Redeem",
    logs,
  });

  return parsedLogs[0].args.actionData.shares;
};

export const useRedeemLeverageToken = (settings?: SeamlessWriteAsyncParams) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    ...settings,
    queriesToInvalidate: [undefined],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const redeemAsync = async (args: {
    leverageToken?: Address;
    equityInCollateral?: bigint;
    maxShares?: bigint;
    maxSwapCostInCollateral?: bigint;
    swapContext?: SwapContext;
  }) => {
    try {
      const { leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral, swapContext } = args;

      if (!equityInCollateral) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please re-connect your wallet.");
      if (!maxShares) throw new Error("Min shares is not defined.");
      if (!maxSwapCostInCollateral)
        throw new Error("Max swap cost in collateral is not defined. Something went wrong. Contact support.");
      if (!leverageToken) throw new Error("Leverage token is not defined.");

      // Simulate the redeem first, which will throw an error including any revert strings in the error message
      // and notification
      await simulateContract(getConfig(), {
        address: leverageRouterAddress,
        abi: leverageRouterAbi,
        functionName: "redeem",
        args: [leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral, swapContext as never],
      });

      await writeContractAsync({
        chainId: targetChain.id,
        address: leverageRouterAddress,
        abi: LeverageRouterAbi,
        functionName: "redeem",
        args: [leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral, swapContext as never],
      });
    } catch (error) {
      console.error("Failed to redeem", error);
      showNotification({
        status: "error",
        content: `Failed to mint: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isRedeemPending: rest.isPending, redeemAsync };
};
