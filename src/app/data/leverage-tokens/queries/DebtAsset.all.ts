import { Address } from "viem";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";
import { fetchLendingAdapter } from "./LendingAdapter.hook";
import { LendingAdapterAbi } from "../../../../../abis/LendingAdapter";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../settings/queryConfig";
import { useQuery } from "@tanstack/react-query";

export async function fetchDebtAsset({ leverageToken }: { leverageToken: Address }): Promise<Address> {
  const lendingAdapter = await fetchLendingAdapter({ leverageToken });

  // Infinite cache because debt asset should never change on lending adapter
  return queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: lendingAdapter,
      abi: LendingAdapterAbi,
      functionName: "getDebtAsset",
    }),
    ...infiniteCacheQueryConfig,
  });
}

export const useFetchDebtAsset = (leverageToken?: Address) => {
  return useQuery({
    queryKey: ["fetchDebtAsset", leverageToken],
    queryFn: () => fetchDebtAsset({ leverageToken: leverageToken! }),
    enabled: !!leverageToken,
    ...disableCacheQueryConfig,
  });
};
