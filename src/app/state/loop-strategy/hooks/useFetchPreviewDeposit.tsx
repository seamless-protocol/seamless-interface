import { Address, parseUnits } from "viem";
import { useReadLoopStrategyPreviewDeposit } from "../../../generated/generated";

export const useFetchPreviewDeposit = (
  strategyAddress: Address,
  amount: string
) => {
  const { data: shares } = useReadLoopStrategyPreviewDeposit({
    address: strategyAddress,
    args: [parseUnits(amount, 18)],
  });

  return {
    shares: ((shares || 0n) * 60n) / 100n,
  };
};
