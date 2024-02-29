import { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
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
 * Simple `useCotractRead` wrapper.
 *
 * ## Key Features:
 * - **Type-Safe Contract Interactions**: Utilizes TypeScript generics to ensure type safety across contract interactions.
 * - **Custom Configuration Support**: Supports custom configurations for contract reads, including block number and state overrides, through the `config` parameter.
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
 * });
 * ```
 *
 * In this example, `useSeamlessContractRead` is used to read the `balanceOf` function of a contract.
 *
 * @template TAbi The ABI type of the contract, ensuring type safety for contract interactions.
 * @template TFunctionName The name of the contract function to be called, restricted to 'pure' or 'view' functions.
 * @template TArgs The arguments required by the contract function.
 * @template config The configuration options for the contract read.
 * @template selectData The data selected from the contract read result.
 * @param parameters Configuration for the contract read operation.
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
  > = {} as any
) {
  // ************* //
  // Read contract //
  // ************* //
  const result = useReadContract({ ...parameters });

  return {
    ...result,
  };
}
