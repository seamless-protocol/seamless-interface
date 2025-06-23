import { Address, parseUnits } from "viem";
import {
  Displayable,
  FetchBigIntStrict,
  ViewBigInt,
  formatFetchBigInt,
  formatFetchBigIntToViewBigIntTemp,
} from "@shared";
import { STRATEGY_MULTIPLE_DECIMALS } from "@meta";
import { useQuery } from "@tanstack/react-query";
import { fetchEquityInBlock } from "../queries/Equity.hook";
import { disableCacheQueryConfig } from "../../settings/queryConfig";
import { fetchCollateral } from "../queries/Collateral.fetch";

function cCurrentMultiple(collateral: bigint, equity: bigint): bigint {
  if (equity === 0n) return parseUnits("1", STRATEGY_MULTIPLE_DECIMALS);
  return (collateral * parseUnits("1", STRATEGY_MULTIPLE_DECIMALS)) / equity;
}

export async function fetchStrategyMultiple(strategy: Address): Promise<FetchBigIntStrict> {
  const [{ dollarAmount: collateralUsd }, { dollarAmount: equityUsd }] = await Promise.all([
    fetchCollateral(strategy),
    fetchEquityInBlock({ strategy }),
  ]);

  return formatFetchBigInt(
    cCurrentMultiple(collateralUsd?.bigIntValue, equityUsd?.bigIntValue),
    STRATEGY_MULTIPLE_DECIMALS,
    "x"
  );
}

export const useFetchFormattedStrategyMultiple = (
  strategy: Address | undefined
): Displayable<ViewBigInt | undefined> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFormattedStrategyMultiple", strategy],
    queryFn: () => fetchStrategyMultiple(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigIntTemp(data),
  };
};
