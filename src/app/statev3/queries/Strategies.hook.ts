import { Address } from "viem";
import { ILMRegistryAbi } from "../../../../abis/ILMRegistry";
import { metadataQueryConfig } from "../../../shared/state/settings/config";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { useQuery } from "@tanstack/react-query";
import { ilmRegistryAddress } from "../../generated";

export async function fetchStrategies(): Promise<Address[]> {
  const strategies = await queryContract({
    ...queryOptions({
      abi: ILMRegistryAbi,
      address: ilmRegistryAddress,
      functionName: "getAllILMs",
    }),
    ...metadataQueryConfig,
  });

  return strategies as Address[];
}

export function useFetchAllStrategies() {
  return useQuery({
    queryKey: ["hookAllStrategies"],
    queryFn: fetchStrategies,
    ...disableCacheQueryConfig,
  });
}
