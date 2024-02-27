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

/**
 * `useSeamlessContractRead` Hook
 *
 * This hook is designed to facilitate seamless contract reads within React components by leveraging the wagmi `useReadContract` hook, offering a simplified and streamlined approach to interact with smart contracts.
 *
 * ## Key Features:
 * - **Type-Safe Contract Interactions**: Utilizes TypeScript generics to ensure type safety across contract interactions.
 * - **Seamless Query Key Management**: Integrates with a query store to manage query keys seamlessly, allowing for efficient caching and retrieval of contract read results.
 * - **Custom Configuration Support**: Supports custom configurations for contract reads, including block number and state overrides, through the `config` parameter.
 * - **Selective Data Retrieval**: Allows for the selection of specific data from the contract read result, enhancing efficiency and performance.
 *
 * ## Parameters:
 * - `parameters`: A configuration object for reading from the contract, including contract address, ABI, function name, and arguments.
 * - `seamlessQueryKey`: An optional string that acts as a unique identifier for caching and retrieving the query result within a global query store.
 *
 * ## Usage:
 *
 * ```tsx
 * const { data, isLoading, error } = useSeamlessContractRead({
 *   addressOrName: contractAddress,
 *   contractInterface: contractABI,
 *   functionName: 'balanceOf',
 *   args: [accountAddress],
 * }, 'uniqueQueryKey');
 * ```
 *
 * In this example, `useSeamlessContractRead` is used to read the `balanceOf` function of a contract, with the result uniquely identified by `'uniqueQueryKey'`.
 *
 * @template TAbi The ABI type of the contract, ensuring type safety for contract interactions.
 * @template TFunctionName The name of the contract function to be called, restricted to 'pure' or 'view' functions.
 * @template TArgs The arguments required by the contract function.
 * @template config The configuration options for the contract read.
 * @template selectData The data selected from the contract read result.
 * @param parameters Configuration for the contract read operation.
 * @param seamlessQueryKey Optional unique key for query caching and retrieval.
 * @returns An object containing the result of the contract read operation, including data, loading state, and any errors.
 */
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
  // ************* //
  // Read contract //
  // ************* //
  const result = useReadContract({ ...parameters });
  // *********** //
  // Query cache //
  // *********** //
  const { addQueryKey } = useQueryStore();
  const [queryKeyIsSet, setQueryKeyIsSet] = useState(false); //todo: compare query keys instead of useEffect?

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
