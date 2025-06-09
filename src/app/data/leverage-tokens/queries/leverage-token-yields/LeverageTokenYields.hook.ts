import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { LeverageTokenYields, fetchLeverageTokenYields } from "./LeverageTokenYields";

export function useFetchLeverageTokenYields(address?: Address) {
  return useQuery<LeverageTokenYields>({
    queryKey: ["hookFetchLeverageTokenYields", address],
    queryFn: () => fetchLeverageTokenYields(address!),
    enabled: Boolean(address),
  });
}
