import { Address } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { fFetchBigIntStructured, mergeQueryStates, useToken } from "@shared";
import { loopStrategyAbi } from "../../../generated";
import { useReadContract } from "wagmi";

export const useFetchStrategyAssetsCap = (strategy?: Address): FetchData<FetchBigInt | undefined> => {
  const {
    data: { decimals, symbol },
    ...tokenDataRest
  } = useToken(strategy);

  const { data, ...assetCapRest } = useReadContract({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "getAssetsCap",
    query: {
      enabled: !!strategy,
    },
  });

  return {
    ...mergeQueryStates([tokenDataRest, assetCapRest]),
    data: fFetchBigIntStructured(data, decimals, symbol),
  };
};
