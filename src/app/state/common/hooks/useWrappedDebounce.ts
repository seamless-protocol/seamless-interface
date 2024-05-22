import { useDebounce } from "@uidotdev/usehooks";
import { parseUnits } from "viem";
import { formatUnitsToNumber } from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "@meta";

export const useWrappedDebounce = (
  assetAmount: string,
  assetPrice: bigint = 0n,
  delay: number = 500,
  decimals: number = 18
) => {
  const debouncedAmount = useDebounce(assetAmount, delay);

  return {
    debouncedAmount,
    debouncedAmountInUsd: formatUnitsToNumber(
      (parseUnits(debouncedAmount, decimals) * (assetPrice || 0n)) / ONE_ETHER,
      8
    ),
  };
};
