import { Address, zeroAddress } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import {
  Displayable,
  ViewBigInt,
  fFetchBigIntStructured,
  mergeQueryStates,
  useSeamlessContractRead,
  useToken,
} from "@shared";
import { loopStrategyAbi } from "../../../generated";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

export const useFetchMaxDeposit = (strategy?: Address): FetchData<FetchBigInt | undefined> => {
  const {
    data: { decimals, symbol },
    ...tokenDataRest
  } = useToken(strategy);

  const { data, ...maxDepositRest } = useSeamlessContractRead({
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "maxDeposit",
    args: [zeroAddress as Address],
    query: {
      enabled: !!strategy,
    },
  });

  return {
    ...mergeQueryStates([tokenDataRest, maxDepositRest]),
    data: fFetchBigIntStructured(data, decimals, symbol),
  };
};

export const useFetchViewMaxDeposit = (strategy: Address): Displayable<ViewBigInt> => {
  const { data: maxDeposit, ...rest } = useFetchMaxDeposit(strategy);

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(maxDeposit),
  };
};
