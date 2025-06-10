import { useQuery } from "@tanstack/react-query";
import type { Conversion, GetConversionsParams } from "@fuul/sdk/dist/types/api";
import { fetchAllConversionsQueryOptions } from "./Conversions.fetch";

export function useFetchAllFuulConversions(params: GetConversionsParams) {
  return useQuery<Conversion[]>(fetchAllConversionsQueryOptions(params));
}
