import { useQuery } from "@tanstack/react-query";
import { fetchEtherFiApr, EtherFiAprData } from "./EtherfiApr.fetch";

export const hookEtherFiAprQueryOptions = () => ({
  queryKey: ["fetchEtherFiApr"] as const,
  queryFn: () => fetchEtherFiApr(),
});

export function useFetchEtherFiApr() {
  return useQuery<EtherFiAprData>(hookEtherFiAprQueryOptions());
}
