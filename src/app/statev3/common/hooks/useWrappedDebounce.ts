import { useDebounce } from "@uidotdev/usehooks";

export const useWrappedDebounce = (assetAmount: string, delay: number = 500) => {
  const debouncedAmount = useDebounce(assetAmount, delay);

  return {
    debouncedAmount,
  };
};
