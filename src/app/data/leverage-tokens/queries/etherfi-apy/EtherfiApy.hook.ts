import { useQuery } from "@tanstack/react-query";
import { fetchEtherFiData, EtherFiApyData } from "./EtherfiApy.fetch";

export const hookEtherFiDataQueryOptions = () => ({
  queryKey: ["hookEtherFiData"] as const,
  queryFn: () => fetchEtherFiData(),
});

export function useFetchEtherFiData() {
  return useQuery<EtherFiApyData>(hookEtherFiDataQueryOptions());
}
