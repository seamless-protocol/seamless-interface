import { useDebounce } from "@uidotdev/usehooks";
import { parseEther } from "viem";
import { formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../meta/constants";

export const useWrappedDebounce = (
  assetAmount: string,
  assetPrice: bigint = 0n,
  delay: number = 500
) => {
  const debouncedAmount = useDebounce(assetAmount, delay);

  return {
    debouncedAmount,
    debouncedAmountInUsd: formatUnitsToNumber(
      (parseEther(debouncedAmount) * (assetPrice || 0n)) / ONE_ETHER,
      8
    ),
  };
};
