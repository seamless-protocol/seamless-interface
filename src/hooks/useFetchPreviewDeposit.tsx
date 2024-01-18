import { parseEther } from "viem";
import { useReadLoopStrategyPreviewDeposit } from "../generated/generated";

export const useFetchPreviewDeposit = (amount: number) => {
  const { data: shares } = useReadLoopStrategyPreviewDeposit({
    args: [parseEther(amount.toString())],
  });

  return {
    shares: ((shares || 0n) * 75n) / 100n,
  };
};
