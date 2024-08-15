import { Address } from "viem";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../generated";
import { FetchBigInt, fUsdValueStructured, formatFetchBigIntToViewBigIntTemp } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

export async function fetchCollateralUsd(strategy: Address): Promise<FetchBigInt | undefined> {
  const collateralUsd = await queryContract(
    queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "collateralUSD",
    })
  );

  return fUsdValueStructured(collateralUsd);
}

export const useFetchCollateralUsd = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchDetailCollateral", strategy],
    queryFn: () => fetchCollateralUsd(strategy!),
    enabled: !!strategy,
  });
};

export const useFetchViewCollateralUsd = (strategy: Address | undefined) => {
  const { data, ...rest } = useFetchCollateralUsd(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigIntTemp(data),
  };
};
