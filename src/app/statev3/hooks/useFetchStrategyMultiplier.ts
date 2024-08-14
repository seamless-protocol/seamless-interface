import { Address } from "viem";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigIntTemp,
} from "../../../shared";
import { fetchDetailEquity } from "../queries/useFetchViewDetailEquity";
import { fetchCollateralUsd } from "../queries/useFetchViewCollateralUsd";
import { ONE_ETHER } from "../../../meta";
import { useQuery } from "@tanstack/react-query";

function cCurrentMultiple(collateral: bigint | undefined, equity: bigint | undefined) {
  if (collateral == null || equity == null) return undefined;

  return (collateral * ONE_ETHER) / equity;
}

export async function fetchStrategyMultiplier(strategy: Address): Promise<FetchBigInt | undefined> {
  const collateralUsd = await fetchCollateralUsd(strategy);

  const { dollarAmount: equityUsd } = await fetchDetailEquity(strategy);

  return fFetchBigIntStructured(cCurrentMultiple(collateralUsd?.bigIntValue, equityUsd?.bigIntValue), 18, "x");
}

export const useFetchStrategyMultiplier = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["fetchStrategyMultiplier", strategy],
    queryFn: () => fetchStrategyMultiplier(strategy!),
    enabled: !!strategy,
  });
};

export const useFetchViewStrategyMultiplier = (strategy: Address | undefined): Displayable<ViewBigInt | undefined> => {
  const { data, ...rest } = useFetchStrategyMultiplier(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigIntTemp(data),
  };
};
