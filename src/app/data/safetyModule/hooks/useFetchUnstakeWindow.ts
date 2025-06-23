import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { FetchData, FetchBigInt } from "@shared";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";
import { useQuery } from "@tanstack/react-query";
// TODO: clean up unused imports after confirming we won't need them later

async function _fetchUnstakeWindow(address: Address) {
  
  const queryClient = getQueryClient();

  const result: bigint = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: StakedTokenAbi,
      functionName: "getUnstakeWindow",
      args: [],
    }),
  });

  return result;
}

export async function fetchUnstakeWindow(asset: Address): Promise<FetchBigInt | undefined> {
  const [result] = await Promise.all([_fetchUnstakeWindow(asset)]);

  return {
    bigIntValue: result,
  };
}

export const useFetchUnstakeWindow = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  
  const { data: result, ...restResult } = useQuery({
    queryKey: ["fetchUnstakeWindow", asset],
    queryFn: () => fetchUnstakeWindow(asset!),
    enabled: !!asset 
  });

  return {
    ...restResult,
    data: result,
  };
};


