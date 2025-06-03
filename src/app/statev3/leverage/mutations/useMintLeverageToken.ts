import { getParsedError, SeamlessWriteAsyncParams, useNotificationContext, useSeamlessContractWrite } from "@shared";
import { etherFiLeverageRouterAbi, etherFiLeverageRouterAddress } from "@generated";
import { useAccount } from "wagmi";
import { targetChain } from "../../../config/rainbow.config";
import { Address } from "viem";

export const useMintLeverageToken = (settings?: SeamlessWriteAsyncParams) => {
  /* ------------- */
  /*   Meta data   */
  /* ------------- */
  const { address } = useAccount();
  const { showNotification } = useNotificationContext();

  /* ----------------- */
  /*   Mutation config */
  /* ----------------- */
  const { writeContract, ...rest } = useSeamlessContractWrite({
    ...settings,
    queriesToInvalidate: [],
  });

  /* -------------------- */
  /*   Mutation wrapper   */
  /* -------------------- */
  const mint = (args: { leverageToken: Address; amount: bigint; minShares: bigint }) => {
    try {
      const { leverageToken, amount, minShares } = args;
      if (!amount) throw new Error("Amount is not defined. Please ensure the amount is greater than 0.");
      if (!address) throw new Error("Account address is not found. Please re-connect your wallet.");

      writeContract({
        chainId: targetChain.id,
        address: etherFiLeverageRouterAddress,
        abi: etherFiLeverageRouterAbi,
        functionName: "mint",
        args: [leverageToken, amount, minShares],
      });
    } catch (error) {
      console.error("Failed to stake", error);
      showNotification({
        status: "error",
        content: `Failed to mint: ${getParsedError(error)}`,
      });
    }
  };

  return { ...rest, isMintPending: rest.isPending, mint };
};
