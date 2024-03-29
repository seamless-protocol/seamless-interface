import { waitForTransactionReceipt } from "@wagmi/core";
import { Hash } from "viem";
import { Config } from "wagmi";

export async function waitForTransaction(config: Config, writeFunction: () => Promise<Hash>) {
  const txHash = await writeFunction();
  const result = await waitForTransactionReceipt(config, {
    hash: txHash,
  });

  return {
    txHash,
    isSuccess: result.status === "success",
  };
}
