import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { FetchData, FetchBigInt } from "@shared";
import { useAccount } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";

async function _fetchStakerCooldown(address: Address, account: Address) {
  
  const queryClient = getQueryClient();

  const result: bigint = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: StakedTokenAbi,
      functionName: "getStakerCooldown",
      args: [account],
    }),
  });

  return result;
}

export async function fetchStakerCooldown(asset: Address, account: Address): Promise<FetchBigInt | undefined> {
  const [cooldown] = await Promise.all([_fetchStakerCooldown(asset, account)]);

  return {
    bigIntValue: cooldown,
  };
}

export const useFetchStakerCooldown = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: cooldown, ...restCooldown } = useQuery({
    queryKey: ["fetchCooldown", asset, account?.address],
    queryFn: () => fetchStakerCooldown(asset!, account?.address!),
    enabled: !!asset && !!account?.address,
  });

  return {
    ...restCooldown,
    data: cooldown,
  };
};

export const useWatchStakerCooldown = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: cooldown, ...restCooldown } = useQuery({
    queryKey: ["fetchCooldown", asset, account?.address],
    queryFn: () => fetchStakerCooldown(asset!, account?.address!),
    enabled: !!asset && !!account?.address,
    refetchInterval: 10_000, // every 10 seconds
  });

  return {
    ...restCooldown,
    data: cooldown,
  };
};


