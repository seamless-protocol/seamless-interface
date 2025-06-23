import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { Address, decodeEventLog } from "viem";
import { useAccount } from "wagmi";
import { getPublicClient, simulateContract } from "wagmi/actions";
import { MintEventAbi } from "../../../../../abis/MintEvent";
import { config, targetChain } from "../../../config/rainbow.config";
import { SwapContext } from "../../../data/leverage-tokens/hooks/useFetchAerodromeRoute";
import { leverageRouterAbi, leverageRouterAddress } from "../../../generated";
import { getConfig } from "../../../utils/queryContractUtils";

export const getMintedShares = async (txHash: `0x${string}`) => {
  const client = getPublicClient(config);
  const receipt = await client.getTransactionReceipt({ hash: txHash });
  const logs = receipt.logs;

  for (const log of logs) {
    try {
      const decodedLog = decodeEventLog({
        abi: MintEventAbi,
        data: log.data,
        topics: log.topics,
      });

      if (!decodedLog?.args) continue;

      const args = decodedLog.args as unknown as { actionData: { shares: bigint } };
      return args.actionData.shares;
    } catch (error) {}
  }
};

export const useMintLeverageToken = (settings?: SeamlessWriteAsyncParams) => {
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
  const mintAsync = async (args: {
    leverageToken?: Address;
    amount?: bigint;
    minShares?: bigint;
    maxSwapCostInCollateral?: bigint;
    swapContext?: SwapContext;
  }) => {
    try {
      const { leverageToken, amount, minShares, maxSwapCostInCollateral, swapContext } = args;
      if (!amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please re-connect your wallet.");
      if (!minShares) throw new Error("Min shares is not defined.");
      if (!maxSwapCostInCollateral) throw new Error("Max swap cost in collateral is not defined.");
      if (!leverageToken) throw new Error("Leverage token is not defined.");

      const amountAfterSwapCost = amount - maxSwapCostInCollateral;

      // Simulate the mint first, which will throw an error including any revert strings in the error message
      // and notification
      await simulateContract(getConfig(), {
        address: leverageRouterAddress,
        abi: leverageRouterAbi,
        functionName: "mint",
        args: [leverageToken, amountAfterSwapCost, minShares, maxSwapCostInCollateral, swapContext as never],
      });

      const mintTx = await writeContractAsync({
        chainId: targetChain.id,
        address: leverageRouterAddress,
        abi: leverageRouterAbi,
        functionName: "mint",
        args: [leverageToken, amountAfterSwapCost, minShares, maxSwapCostInCollateral, swapContext as never],
      });

      return {
        txHash: mintTx,
        shares: await getMintedShares(mintTx),
      };
    } catch (error) {
      console.error("Failed to mint", error);
      showNotification({
        status: "error",
        content: `Failed to mint: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isMintPending: rest.isPending, mintAsync };
};
