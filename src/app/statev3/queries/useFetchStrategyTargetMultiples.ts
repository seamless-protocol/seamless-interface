import { Address } from "viem";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../generated";
import { ONE_ETHER, ONE_USD } from "../../../meta";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigIntTemp,
} from "../../../shared";
import { useQuery } from "@tanstack/react-query";

function cMultiple(collateralRatioTarget: bigint): bigint {
  return (collateralRatioTarget * ONE_ETHER) / (collateralRatioTarget - ONE_USD);
}

interface TargeMultiples {
  minForRebalance: FetchBigInt | undefined;
  maxForRebalance: FetchBigInt | undefined;
  target: FetchBigInt | undefined;
}

export async function fetchStrategyTargetMultiples(strategy: Address): Promise<TargeMultiples> {
  const { minForRebalance, target, maxForRebalance } = await queryContract(
    queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getCollateralRatioTargets",
    })
  );

  return {
    minForRebalance: fFetchBigIntStructured(cMultiple(minForRebalance), 18, "x"),
    maxForRebalance: fFetchBigIntStructured(cMultiple(maxForRebalance), 18, "x"),
    target: fFetchBigIntStructured(cMultiple(target), 18, "x"),
  };
}

export const useFetchStrategyTargetMultiples = (strategy: Address | undefined) => {
  return useQuery({
    queryKey: ["useFetchStrategyTargetMultiples", strategy],
    queryFn: () => fetchStrategyTargetMultiples(strategy!),
    enabled: !!strategy,
  });
};

interface ViewTargetMultiples {
  minForRebalance: ViewBigInt | undefined;
  maxForRebalance: ViewBigInt | undefined;
  target: ViewBigInt | undefined;
}

export const useFetchViewStrategyTargetMultiples = (
  strategy: Address | undefined
): Displayable<ViewTargetMultiples> => {
  const { data, ...rest } = useFetchStrategyTargetMultiples(strategy);

  return {
    ...rest,
    data: {
      minForRebalance: formatFetchBigIntToViewBigIntTemp(data?.minForRebalance),
      maxForRebalance: formatFetchBigIntToViewBigIntTemp(data?.maxForRebalance),
      target: formatFetchBigIntToViewBigIntTemp(data?.target),
    },
  };
};
