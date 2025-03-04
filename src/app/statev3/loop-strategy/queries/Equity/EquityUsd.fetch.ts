import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../../../generated";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";

export const getEquityUsdContractQueryOptions = (address?: Address) => {
  return readContractQueryOptions(getConfig(), {
    address,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
  });
};

export async function fetchEquityUsd(address?: Address): Promise<bigint> {
  const queryClient = getQueryClient();

  const equityUsd = await queryClient.fetchQuery({
    ...getEquityUsdContractQueryOptions(address),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return equityUsd;
}
