import { Address } from "viem";
import { getQueryClient } from "../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import { config } from "../../config/rainbow.config";
import { loopStrategyAbi } from "../../generated";
import { FetchBigInt, fUsdValueStructured, formatFetchBigIntToViewBigIntTemp } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

export async function fetchCollateralUsd(strategy: Address): Promise<FetchBigInt | undefined> {
  const queryClient = getQueryClient();

  const collateralUsd = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "collateralUSD",
    })
  );

  return fUsdValueStructured(collateralUsd);
}

export const useFetchDetailCollateral = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailCollateral", strategy],
    queryFn: () => fetchCollateralUsd(strategy!),
    enabled: !!strategy,
  });
};

export const useFetchViewDetailCollateral = (strategy: Address | undefined) => {
  const { data, ...rest } = useFetchDetailCollateral(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigIntTemp(data),
  };
};
