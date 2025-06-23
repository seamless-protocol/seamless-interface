import { InputBundlerOperation, populateBundle, finalizeBundle, encodeBundle } from "@morpho-org/bundler-sdk-viem";
import { SimulationState } from "@morpho-org/simulation-sdk";
import { getWalletClient } from "wagmi/actions";
import { getConfig } from "../../../utils/queryContractUtils";
import { Address } from "viem";
import { base } from "viem/chains";

export const setupBundle = async (
  account: { address: Address | undefined },
  startData: SimulationState,
  inputOperations: InputBundlerOperation[]
) => {
  if (!account?.address) throw new Error("Account address is not found. Please try connecting your wallet.");

  const config = getConfig();
  const walletClient = await getWalletClient(config, { chainId: base.id });
  if (!walletClient) {
    throw new Error("No wallet client found! Connect a wallet first.");
  }

  let { operations } = populateBundle(inputOperations, startData);
  operations = finalizeBundle(operations, startData, account?.address);

  const bundle = encodeBundle(operations, startData, true);

  await Promise.all(
    bundle.requirements.signatures.map((requirement) =>
      requirement.sign(walletClient, { address: account.address } as any)
    )
  );

  const txs = bundle.requirements.txs.map(({ tx }) => tx).concat([bundle.tx()]);

  return txs;
};
