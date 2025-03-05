import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../../../generated";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";

export const getEquityContractQueryOptions = (address?: Address) => {
  return readContractQueryOptions(getConfig(), {
    address,
    abi: loopStrategyAbi,
    functionName: "equity",
  });
};

export async function fetchEquity(address?: Address): Promise<bigint> {
  const queryClient = getQueryClient();
  console.log({ qq: getEquityContractQueryOptions(address).queryKey });

  // const equity = await queryClient.fetchQuery({
  //   ...getEquityContractQueryOptions(address),
  //   ...queryConfig.semiSensitiveDataQueryConfig,
  // });
  const equity = await queryClient.fetchQuery({
    queryKey: [
      "readContract",
      {
        address,
        functionName: "equity",
      },
    ],
    queryFn: async () => {
      // return random number
      return BigInt(Math.floor(Math.random() * 1000));
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  console.log("Total equity fetched:", equity);

  return equity;
}
