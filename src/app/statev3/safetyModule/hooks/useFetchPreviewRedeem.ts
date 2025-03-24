import { Address } from "viem";
import { StakedTokenAbi } from "../../../../../abis/StakedToken";
import { FetchData, FetchBigInt } from "@shared";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../utils/queryContractUtils";

import { useQuery } from "@tanstack/react-query";

async function _fetchPreviewRedeem(address: Address, amount: bigint) {
  const queryClient = getQueryClient();

  const result: bigint = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: StakedTokenAbi,
      functionName: "previewRedeem",
      args: [amount],
    }),
  });

  return result;
}

export async function fetchPreviewRedeem(asset: Address, amount: bigint): Promise<FetchBigInt | undefined> {
  const [result] = await Promise.all([_fetchPreviewRedeem(asset, amount)]);

  return {
    bigIntValue: result,
  };
}

export const useFetchPreviewRedeem = (asset?: Address, amount?: bigint): FetchData<FetchBigInt | undefined> => {
  const { data: result, ...restResult } = useQuery({
    queryKey: ["fetchPreviewRedeem", asset, amount],
    queryFn: () => fetchPreviewRedeem(asset!, amount!),
    enabled: Boolean(asset) && Boolean(amount),
  });

  return {
    ...restResult,
    data: result,
  };
};
