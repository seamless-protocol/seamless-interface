import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { FetchData, FetchBigInt } from "@shared";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";

async function _fetchCooldown(address: Address) {
  const queryClient = getQueryClient();

  const result: bigint = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: StakedTokenAbi,
      functionName: "getCooldown",
      args: [],
    }),
  });

  return result;
}

export async function fetchCooldown(asset: Address): Promise<FetchBigInt | undefined> {
  const [cooldown] = await Promise.all([_fetchCooldown(asset)]);

  return {
    bigIntValue: cooldown,
  };
}

export const fetchCooldownQK = (asset?: Address) => ["fetchCooldown", asset];

export const useFetchCooldown = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const { data: cooldown, ...restCooldown } = useQuery({
    queryKey: fetchCooldownQK(asset),
    queryFn: () => fetchCooldown(asset!),
    enabled: !!asset,
  });

  return {
    ...restCooldown,
    data: cooldown,
  };
};
