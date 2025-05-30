import { Address } from "viem";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";
import { LeverageManagerAbi } from "../../../../abis/LeverageManager";
import { infiniteCacheQueryConfig } from "../settings/queryConfig";
import { leverageManagerAddress } from "../../generated";

export async function fetchLendingAdapter({ leverageToken }: { leverageToken: Address }): Promise<Address> {
  // Infinite cache because lending adapter should never change on leverage token
  const lendingAdapter = await queryContract<Address>({
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
