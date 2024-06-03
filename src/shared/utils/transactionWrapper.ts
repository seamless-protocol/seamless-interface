import { waitForTransactionReceipt } from "@wagmi/core";
import { Hash } from "viem";
import { Config } from "wagmi";

export async function waitForTransaction(config: Config, writeFunction: () => Promise<Hash | undefined>) {
  const txHash = await writeFunction();

  if (txHash == null) {
    return {
      txHash,
      isSuccess: false
    }
  }
  const result = await waitForTransactionReceipt(config, {
    hash: txHash,
  });

  return {
    txHash,
    isSuccess: result.status === "success",
  };
}
