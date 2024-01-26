import { parseUnits } from "viem";
import { useReadLoopStrategyPreviewDeposit } from "../generated/generated";

export const useFetchPreviewDeposit = (amount: string) => {
  const { data: shares } = useReadLoopStrategyPreviewDeposit({
    args: [parseUnits(amount, 18)],
  });

  return {
    shares: ((shares || 0n) * 60n) / 100n,
  };
};
