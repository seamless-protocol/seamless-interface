import { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import { useQueryStore } from "../store/QueryStore";
import { useEffect, useState } from "react";
import {
  Config,
  ResolvedRegister,
  UseReadContractParameters,
  useReadContract,
} from "wagmi";
import { ReadContractData } from "wagmi/query";

export function useSeamlessContractRead<
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends ContractFunctionName<TAbi, "pure" | "view">,
  TArgs extends ContractFunctionArgs<TAbi, "pure" | "view", TFunctionName>,
  config extends Config = ResolvedRegister["config"],
  selectData = ReadContractData<TAbi, TFunctionName, TArgs>,
>(
  parameters: UseReadContractParameters<
    TAbi,
    TFunctionName,
    TArgs,
    config,
    selectData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  > = {} as any,
  seamlessQueryKey?: string
) {
  const result = useReadContract({ ...parameters });
  const { addQueryKey } = useQueryStore();

  //todo: compare query keys instead?
  const [queryKeyIsSet, setQueryKeyIsSet] = useState(false);

  useEffect(() => {
    if (!queryKeyIsSet && result.queryKey && seamlessQueryKey) {
      setQueryKeyIsSet(true);
      addQueryKey(seamlessQueryKey, result.queryKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seamlessQueryKey, queryKeyIsSet]);

  return {
    ...result,
  };
}
