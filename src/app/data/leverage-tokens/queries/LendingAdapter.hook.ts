import { Address } from "viem";
import { getConfig } from "../../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";
import { LeverageManagerAbi } from "../../../../../abis/LeverageManager";
import { infiniteCacheQueryConfig } from "../../settings/queryConfig";
import { leverageManagerAddress } from "../../../generated";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";

export async function fetchLendingAdapter({ leverageToken }: { leverageToken: Address }): Promise<Address> {
  // Infinite cache because lending adapter should never change on leverage token
  const lendingAdapter = await getQueryClient().fetchQuery({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: LeverageManagerAbi,
      functionName: "getLeverageTokenLendingAdapter",
      args: [leverageToken],
    }),
    ...infiniteCacheQueryConfig,
  });

  return lendingAdapter;
}
