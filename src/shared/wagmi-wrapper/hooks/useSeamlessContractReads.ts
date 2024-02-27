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

/**
 * `useSeamlessContractReads` Hook
 *
 * A React hook designed for performing multiple contract read operations simultaneously in a seamless and efficient manner. It leverages the wagmi `useReadContracts` hook for batch reading from smart contracts, enhancing application performance and user experience.
 *
 * ## Key Features:
 * - **Batch Contract Reads**: Enables multiple contract reads in a single hook call, reducing network requests and improving efficiency.
 * - **Type-Safe Batch Reads**: Employs TypeScript generics to ensure type safety and integrity across multiple contract interactions.
 * - **Seamless Query Key Management**: Automatically manages query keys for caching and retrieval, facilitating efficient data management in React applications.
 * - **Flexible Configuration**: Supports custom configurations for batch reads, including allowances for failures and custom result selection.
 *
 * ## Parameters:
 * - `parameters`: An object specifying the configurations for the batch contract read operations, including the list of contracts and their respective read parameters.
 * - `seamlessQueryKey`: An optional string to uniquely identify the batch read operation for caching and data retrieval purposes.
 *
 * ## Usage:
 *
 * ```tsx
 * const { data, isLoading, error } = useSeamlessContractReads({
 *   contracts: [
 *     { addressOrName: contractAddress1, contractInterface: contractABI1, functionName: 'functionName1', args: [args1] },
 *     { addressOrName: contractAddress2, contractInterface: contractABI2, functionName: 'functionName2', args: [args2] }
 *   ]
 * }, 'uniqueBatchQueryKey');
 * ```
 *
 * In this example, `useSeamlessContractReads` performs two contract read operations in a single hook call, with the results uniquely identified by `'uniqueBatchQueryKey'`.
 *
 * @template contracts The list of contracts and their read parameters, ensuring type safety and integrity.
 * @template allowFailure A boolean indicating whether the hook should allow individual read operations to fail without affecting others.
 * @template config The configuration options for the batch contract read operations.
 * @template selectData The data selected from the batch read results.
 * @param parameters Configuration for the batch contract read operations.
 * @param seamlessQueryKey Optional unique key for batch query caching and retrieval.
 * @returns An object containing the results of the batch contract read operations, including data for each contract, loading states, and any errors encountered.
 */
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
  // ************* //
  // Read contract //
  // ************* //
  const result = useReadContracts({ ...parameters });
  // *********** //
  // Query cache //
  // *********** //
  const { addQueryKey } = useQueryStore();
  const [queryKeyIsSet, setQueryKeyIsSet] = useState(false); //todo: compare query keys instead of useeffect?

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
