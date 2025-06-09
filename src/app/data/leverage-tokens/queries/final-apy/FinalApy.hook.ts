import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { LeverageTokenApys, fetchLeverageTokenApys } from "./FinalApy.fetch";

export function useFetchLeverageTokenApys(address?: Address, fuulProgramId?: string) {
  return useQuery<LeverageTokenApys>({
    queryKey: ["hookFetchLeverageTokenApys", address, fuulProgramId],
    queryFn: () => fetchLeverageTokenApys(address!, fuulProgramId!),
    enabled: Boolean(address) && Boolean(fuulProgramId),
  });
}
