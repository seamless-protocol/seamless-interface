import { Address } from "viem";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";
import { fetchLendingAdapter } from "./LendingAdapter.hook";
import { LendingAdapterAbi } from "../../../../../abis/LendingAdapter";
import { disableCacheQueryConfig, infiniteCacheQueryConfig } from "../../settings/queryConfig";
import { useQuery } from "@tanstack/react-query";

export async function fetchCollateralAsset({ leverageToken }: { leverageToken: Address }): Promise<Address> {
  const lendingAdapter = await fetchLendingAdapter({ leverageToken });

  // Infinite cache because collateral asset should never change on lending adapter
  return queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: lendingAdapter,
      abi: LendingAdapterAbi,
      functionName: "getCollateralAsset",
    }),
    ...infiniteCacheQueryConfig,
  });
}

export const useFetchCollateralAsset = (leverageToken?: Address) => {
  return useQuery({
    queryKey: ["fetchCollateralAsset", leverageToken],
    queryFn: () => fetchCollateralAsset({ leverageToken: leverageToken! }),
    enabled: !!leverageToken,
    ...disableCacheQueryConfig,
  });
};
