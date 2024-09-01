import { Address } from "viem";
import { loopStrategyAbi } from "../../generated";
import { ONE_ETHER, ONE_USD, STRATEGY_MULTIPLE_DECIMALS } from "@meta";
import { Displayable, FetchBigInt, ViewBigInt, formatFetchBigInt, formatFetchBigIntToViewBigIntTemp } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { disableCacheQueryConfig, metadataQueryConfig } from "../../state/settings/queryConfig";

function cMultiple(collateralRatioTarget: bigint): bigint {
  return (collateralRatioTarget * ONE_ETHER) / (collateralRatioTarget - ONE_USD);
}

interface TargeMultiples {
  minForRebalance: FetchBigInt;
  maxForRebalance: FetchBigInt;
  target: FetchBigInt;
}

export async function fetchStrategyTargetMultiples(strategy: Address): Promise<TargeMultiples> {
  const { minForRebalance, target, maxForRebalance } = await queryContract({
    ...queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getCollateralRatioTargets",
    }),
    ...metadataQueryConfig,
  });

  return {
    minForRebalance: formatFetchBigInt(cMultiple(minForRebalance), STRATEGY_MULTIPLE_DECIMALS, "x"),
    maxForRebalance: formatFetchBigInt(cMultiple(maxForRebalance), STRATEGY_MULTIPLE_DECIMALS, "x"),
    target: formatFetchBigInt(cMultiple(target), STRATEGY_MULTIPLE_DECIMALS, "x"),
  };
}

interface ViewTargetMultiples {
  minForRebalance: ViewBigInt | undefined;
  maxForRebalance: ViewBigInt | undefined;
  target: ViewBigInt | undefined;
}

export const useFetchFormattedStrategyTargetMultiples = (
  strategy: Address | undefined
): Displayable<ViewTargetMultiples> => {
  const { data, ...rest } = useQuery({
    queryKey: ["hookFormattedStrategyTargetMultiples", strategy],
    queryFn: () => fetchStrategyTargetMultiples(strategy!),
    enabled: !!strategy,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      minForRebalance: formatFetchBigIntToViewBigIntTemp(data?.minForRebalance),
      maxForRebalance: formatFetchBigIntToViewBigIntTemp(data?.maxForRebalance),
      target: formatFetchBigIntToViewBigIntTemp(data?.target),
    },
  };
};
