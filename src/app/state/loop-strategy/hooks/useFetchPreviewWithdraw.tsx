import { Address, parseUnits } from "viem";
import { useReadLoopStrategyPreviewRedeem } from "../../../generated/generated";

export const useFetchPreviewWithdraw = (
  strategyAddress: Address,
  amount: string
) => {
  const { data: shares } = useReadLoopStrategyPreviewRedeem({
    address: strategyAddress,
    args: [parseUnits(amount, 18)],
  });

  return {
    shares: ((shares || 0n) * 60n) / 100n,
  };
};
