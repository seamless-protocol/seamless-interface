import { Address } from "viem";
import { ILMRegistryAbi } from "../../../../abis/ILMRegistry";
import { metadataQueryConfig } from "../../../shared/state/settings/config";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { disableCacheQueryConfig } from "../settings/queryConfig";
import { useQuery } from "@tanstack/react-query";
import { ilmRegistryAddress } from "../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { strategyConfig } from "../settings/config";

export async function fetchStrategies(): Promise<Address[]> {
  const strategies = await queryContract({
    ...readContractQueryOptions(getConfig(), {
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

export function useFetchAllConfiguredStrategies() {
  return useQuery({
    queryKey: ["hookAllConfiguredStrategies"],
    queryFn: async () => {
      const allStrategies = await fetchStrategies();
      const configuredStrategies = allStrategies.filter(
        (strategy) => strategyConfig[strategy] !== undefined
      );

      return configuredStrategies;
    },
    ...disableCacheQueryConfig,
  });
}

