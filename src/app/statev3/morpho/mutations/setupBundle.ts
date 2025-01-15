import { InputBundlerOperation, populateBundle, finalizeBundle, encodeBundle } from "@morpho-org/bundler-sdk-viem";
import { SimulationState } from "@morpho-org/simulation-sdk";
import { getPublicClient } from "wagmi/actions";
import { getConfig } from "../../../utils/queryContractUtils";
import { Address } from "viem";

export const setupBundle = async (
  account: { address: Address | undefined },
  startData: SimulationState,
  inputOperations: InputBundlerOperation[]
) => {
  if (!account?.address) throw new Error("Account address is not found. Please try connecting your wallet.");

  const client = getPublicClient(getConfig());
  let { operations } = populateBundle(inputOperations, startData);

  operations = finalizeBundle(operations, startData, account?.address);
  const bundle = encodeBundle(operations, startData);
  const txs = bundle.requirements.txs.map(({ tx }) => tx).concat([bundle.tx()]);

  if (client) {
    await Promise.all(bundle.requirements.signatures.map((requirement) => requirement.sign(client, account as any)));
  }

  return txs;
};
