import { getPublicClient } from "wagmi/actions";
import { getConfig } from "./queryContractUtils";
import { Address } from "viem";

export async function checkIfContractExists(address: Address, blockNumber?: bigint) {
  const client = getPublicClient(getConfig());
  if (!client) throw new Error("No client found");

  const code = await client.getCode({
    address,
    blockNumber,
  });

  return code != null && code.startsWith("0x");
}
