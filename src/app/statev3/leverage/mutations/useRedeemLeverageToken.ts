import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { etherFiLeverageRouterAbi, etherFiLeverageRouterAddress, leverageRouterAddress } from "@generated";
import { useAccount } from "wagmi";
import { targetChain } from "../../../config/rainbow.config";
import { Address } from "viem";
import { LeverageRouterAbi } from "../../../../../abis/LeverageRouter";
import { SwapContext } from "../../../state/leverage/useFetchUniswapRoute";

export const useRedeemLeverageToken = () => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContractAsync, ...rest } = useSeamlessContractWrite({
    queriesToInvalidate: [],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const redeemAsync = async (
    args: {
      leverageToken: Address;
      equityInCollateral: bigint;
      maxShares: bigint;
      maxSwapCostInCollateral: bigint;
      swapContext: SwapContext;
    },
    settings?: SeamlessWriteAsyncParams
  ) => {
    try {
      const { leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral, swapContext } = args;

      if (!equityInCollateral) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please re-connect your wallet.");

      await writeContractAsync(
        {
          chainId: targetChain.id,
          address: leverageRouterAddress,
          abi: LeverageRouterAbi,
          functionName: "redeem",
          args: [leverageToken, equityInCollateral, maxShares, maxSwapCostInCollateral, swapContext as never],
        },
        { ...settings }
      );
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
