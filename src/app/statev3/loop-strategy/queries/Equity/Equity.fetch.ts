import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../../../generated";
import { getConfig } from "../../../../utils/queryContractUtils";

export async function fetchEquity(address?: Address): Promise<bigint> {
  const queryClient = getQueryClient();

  const equity = await queryClient.fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address,
      abi: loopStrategyAbi,
      functionName: "equity",
    }),
  });

  return equity;
}
