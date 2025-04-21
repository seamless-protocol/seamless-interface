import { SeamlessWriteAsyncParams, useSeamlessContractWrite } from "@shared";
import { targetChain } from "../../../config/rainbow.config";
import { useAccount } from "wagmi";
import { ESSEAM_ADDRESS } from "../../../../meta";
import { EscroSEAMAbi } from "../../../../../abis/EscroSEAM";

export const useMutateClaimVestedEsSEAM = () => {
  // grab the current user address
  const { address: userAddress } = useAccount();

  // grab the rewards view query so we can invalidate it

  // setup the seamless write hook
  const { writeContractAsync, isPending, ...rest } = useSeamlessContractWrite({});

  // wrapper that actually calls `claim(userAddress)`
  const claimVestedAsync = async (settings?: SeamlessWriteAsyncParams) => {
    if (!userAddress) throw new Error("Wallet not connected");

    await writeContractAsync(
      {
        chainId: targetChain.id,
        address: ESSEAM_ADDRESS,
        abi: EscroSEAMAbi,
        functionName: "claim",
        args: [userAddress],
      },
      { ...settings }
    );
  };

  return {
    claimVestedAsync,
    isClaimVestedPending: isPending,
    ...rest,
  };
};
