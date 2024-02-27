import { useQueryStore } from "../store/QueryStore";
import { useEffect, useState } from "react";
import {
  Config,
  ResolvedRegister,
  UseReadContractsParameters,
  UseReadContractsReturnType,
  useReadContracts,
} from "wagmi";
import { ReadContractsData } from "wagmi/query";

export function useSeamlessContractReads<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister["config"],
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  parameters: UseReadContractsParameters<
    contracts,
    allowFailure,
    config,
    selectData
  > = {},
  seamlessQueryKey?: string
): UseReadContractsReturnType<contracts, allowFailure, selectData> {
  const result = useReadContracts({ ...parameters });
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
