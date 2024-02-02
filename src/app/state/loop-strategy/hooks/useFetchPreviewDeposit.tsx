import { Address, parseUnits } from "viem";
import { loopStrategyAbi } from "../../../generated/generated";
import { useReadContract } from "wagmi";

export const useFetchPreviewDeposit = (
  strategyAddress: Address,
  amount: string
) => {
  console.log("strategyAddress", strategyAddress);
  console.log("amount", amount);
  const { data: shares } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "previewDeposit",
    args: [parseUnits(amount, 18)],
  });

  console.log(shares);

  return {
    shares: ((shares || 0n) * 60n) / 100n,
  };
};
