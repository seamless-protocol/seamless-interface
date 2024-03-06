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
 * A simple `useContractReads` wrapper.
 *
 * ## Key Features:
 * - **Batch Contract Reads**: Enables multiple contract reads in a single hook call, reducing network requests and improving efficiency.
 * - **Type-Safe Batch Reads**: Employs TypeScript generics to ensure type safety and integrity across multiple contract interactions.
 * - **Flexible Configuration**: Supports custom configurations for batch reads, including allowances for failures and custom result selection.
 * - **Multicall**: Doing multicall and it is not relying on batching support from rpc provider.
 * ## Parameters:
 * - `parameters`: An object specifying the configurations for the batch contract read operations, including the list of contracts and their respective read parameters.
 *
 * ## Usage:
 *
 * ```tsx
 * const { data, isLoading, error } = useSeamlessContractReads({
 *   contracts: [
 *     { addressOrName: contractAddress1, contractInterface: contractABI1, functionName: 'functionName1', args: [args1] },
 *     { addressOrName: contractAddress2, contractInterface: contractABI2, functionName: 'functionName2', args: [args2] }
 *   ]
 * });
 * ```
 *
 * In this example, `useSeamlessContractReads` performs multiple contract read operations in a single hook call.
 *
 * @template contracts The list of contracts and their read parameters, ensuring type safety and integrity.
 * @template allowFailure A boolean indicating whether the hook should allow individual read operations to fail without affecting others.
 * @template config The configuration options for the batch contract read operations.
 * @template selectData The data selected from the batch read results.
 * @param parameters Configuration for the batch contract read operations.
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
  > = {}
): UseReadContractsReturnType<contracts, allowFailure, selectData> {
  // ************* //
  // Read contract //
  // ************* //
  const result = useReadContracts({ ...parameters });

  return {
    ...result,
  };
}
