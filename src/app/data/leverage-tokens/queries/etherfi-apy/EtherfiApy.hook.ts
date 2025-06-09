import { useQuery } from "@tanstack/react-query";
import { fetchEtherFiApy, EtherFiApyData } from "./EtherfiApy.fetch";

export const hookEtherFiApyQueryOptions = () => ({
  queryKey: ["hookEtherFiData"] as const,
  queryFn: () => fetchEtherFiApy(),
});

export function useFetchEtherFiApy() {
  return useQuery<EtherFiApyData>(hookEtherFiApyQueryOptions());
}
