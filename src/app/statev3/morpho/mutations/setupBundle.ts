import { InputBundlerOperation, populateBundle, finalizeBundle, encodeBundle } from "@morpho-org/bundler-sdk-viem";
import { SimulationState } from "@morpho-org/simulation-sdk";
import { Address } from "viem";

export const setupBundle = async (
  address: Address,
  startData: SimulationState,
  inputOperations: InputBundlerOperation[]
) => {
  let { operations } = populateBundle(inputOperations, startData);

  operations = finalizeBundle(operations, startData, address);
  const bundle = encodeBundle(operations, startData);
  const txs = bundle.requirements.txs.map(({ tx }) => tx).concat([bundle.tx()]);

  return txs;
};
