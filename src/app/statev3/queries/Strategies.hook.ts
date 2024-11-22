import { Address } from "viem";
import { ILMRegistryAbi } from "../../../../abis/ILMRegistry";
import { metadataQueryConfig } from "../../../shared/state/settings/config";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";
import { useQuery } from "@tanstack/react-query";
import { ilmRegistryAddress } from "../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { cbBTCLong_1_5x, cbBTCLong_3x } from "../../../meta";

export async function fetchStrategies(): Promise<Address[]> {
  const strategies = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      abi: ILMRegistryAbi,
      address: ilmRegistryAddress,
      functionName: "getAllILMs",
    }),
    ...metadataQueryConfig,
  });

  return [...strategies, cbBTCLong_1_5x, cbBTCLong_3x] as Address[];
}

export function useFetchAllStrategies() {
  return useQuery({
    queryKey: ["hookAllStrategies"],
    queryFn: fetchStrategies,
    ...disableCacheQueryConfig,
  });
}
