import { Address } from "viem";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";

export async function fetchEquityDependent(address?: Address, equity?: bigint): Promise<bigint> {
  const queryClient = getQueryClient();

  // const equity = await queryClient.fetchQuery({
  //   ...getEquityContractQueryOptions(address),
  //   ...queryConfig.semiSensitiveDataQueryConfig,
  // });
  const equityDep = await queryClient.fetchQuery({
    queryKey: [
      "readContract",
      {
        address,
        functionName: "equityDep",
        args: [equity], // <- this changes, which automatically triggers a refetch
      },
    ],
    queryFn: async () => {
      // return random number
      return (equity || 0n) + 1n;
    },
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  console.log("Total equityDEP fetched:", equityDep);

  return equityDep;
}
