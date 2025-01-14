import { InputBundlerOperation, populateBundle, finalizeBundle, encodeBundle } from "@morpho-org/bundler-sdk-viem";
import { SimulationState } from "@morpho-org/simulation-sdk";
import { Address } from "viem";

export const setupBundle = async (
  address: Address,
  startData: SimulationState,
  inputOperations: InputBundlerOperation[]
) => {
  console.log("setupBundle?");
  let { operations } = populateBundle(inputOperations, startData);

  operations = finalizeBundle(operations, startData, address);

  const bundle = encodeBundle(operations, startData);

  console.log({ operations });

  const txs = bundle.requirements.txs.map(({ tx }) => tx).concat([bundle.tx()]);

  return txs;
};

// export const setupBundle = async (
//   address: Address,
//   startData: SimulationState,
//   inputOperations: InputBundlerOperation[],
//   {
//     supportsSignature,
//     unwrapTokens,
//     unwrapSlippage,
//     onBundleTx,
//     ...options
//   }: BundlingOptions & {
//     account?: Address | Account;
//     supportsSignature?: boolean;
//     unwrapTokens?: Set<Address>;
//     unwrapSlippage?: bigint;
//     onBundleTx?: (data: SimulationState) => Promise<void> | void;
//   } = {}
// ) => {
//   let { operations } = populateBundle(inputOperations, startData, {
//     ...options,
//     publicAllocatorOptions: {
//       enabled: true,
//       ...options.publicAllocatorOptions,
//     },
//   });
//   operations = finalizeBundle(operations, startData, address, unwrapTokens, unwrapSlippage);
//   console.log({ operations });
//   const bundle = encodeBundle(operations, startData, supportsSignature);

//   const tokens = new Set<Address>();

//   // todo remove this?
//   operations.forEach((operation) => {
//     const { address } = operation;

//     if (isBlueOperation(operation) && operation.type !== "Blue_SetAuthorization") {
//       try {
//         const marketParams = MarketParams.get(operation.args.id);

//         if (marketParams.loanToken !== zeroAddress) tokens.add(marketParams.loanToken);

//         if (marketParams.collateralToken !== zeroAddress) tokens.add(marketParams.collateralToken);
//       } catch (error) {
//         if (!(error instanceof UnknownMarketParamsError)) throw error;
//       }
//     }

//     if (isMetaMorphoOperation(operation)) {
//       tokens.add(address);

//       const vault = startData.tryGetVault(address);
//       if (vault) tokens.add(vault.asset);
//     }

//     if (isErc20Operation(operation)) {
//       tokens.add(address);

//       const unwrapped = getUnwrappedToken(address, startData.chainId);
//       if (unwrapped != null) tokens.add(unwrapped);
//     }
//   });

//   const txs = bundle.requirements.txs.map(({ tx }) => tx).concat([bundle.tx()]);

//   return txs;
// };
