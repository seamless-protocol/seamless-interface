import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { leverageRouterAddress } from "@generated";
import { useAccount } from "wagmi";
import { targetChain } from "../../../config/rainbow.config";
import { Address } from "viem";
import { LeverageRouterAbi } from "../../../../../abis/LeverageRouter";
import { SwapContext } from "../../../data/leverage-tokens/hooks/useFetchAerodromeRoute";

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
    queriesToInvalidate: [],
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

      await writeContractAsync({
        chainId: targetChain.id,
        address: leverageRouterAddress,
        abi: LeverageRouterAbi,
        functionName: "redeem",
        args: [leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral + 1n, swapContext as never],
      });
    } catch (error) {
      console.error("Failed to stake", error);
      showNotification({
        status: "error",
        content: `Failed to mint: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isRedeemPending: rest.isPending, redeemAsync };
};
