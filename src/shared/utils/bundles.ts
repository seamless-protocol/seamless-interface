import { Address, decodeEventLog, pad, parseEther } from "viem";
import { createApproveTx, createDepositTx, createWithdrawTx } from "./bundlesHelpers";
import { depositEventAbi } from "../../../abis/DepositEvent";
import { withdrawEventAbi } from "../../../abis/WithdrawEvent";
import { FetchData, buildSuccessfulFetch } from "../types/Fetch";

export interface PreviewDeposit {
  sharesToReceive: bigint;
}

export interface PreviewWithdraw {
  assetsToReceive: bigint;
}

const alchemySimulationRpc = import.meta.env.VITE_ALCHEMY_SIMULATION_RPC_URL;
const tenderlySimulationRpc = import.meta.env.VITE_TENDERLY_SIMULATION_RPC_URL;

async function simulateBundleTenderly(functionCalls: any) {
  const res = await fetch(tenderlySimulationRpc, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      jsonrpc: "2.0",
      method: "tenderly_simulateBundle",
      params: [functionCalls, "latest"],
    }),
  });

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error("Failed to simulate transactions");
    throw new Error(`Failed to simulate transactions, error: ${res.statusText}`);
  }
  return res.json();
}

export async function simulateDepositTenderly(
  account: Address,
  strategy: Address,
  underlyingAsset: Address,
  amount: string,
  decimals: number
): Promise<PreviewDeposit> {
  if (parseEther(amount) === 0n) throw new Error("Invalid amount");

  const { result } = await simulateBundleTenderly([
    createApproveTx(account, underlyingAsset, strategy, amount, decimals),
    createDepositTx(account, strategy, amount, decimals),
  ]);

  if (!result || !result[1].logs) throw new Error("Failed to simulate transactions");

  // Take logs from second transaction
  const { logs } = result[1];
  // Deposit even is the last event
  const depositEvent = logs ? logs[logs.length - 1].raw : undefined;

  if (!depositEvent) throw new Error("Failed to find deposit event");

  const decodedDepositEvent = decodeEventLog({
    abi: depositEventAbi,
    data: depositEvent.data,
    topics: [depositEvent.topics[0], pad(depositEvent.topics[1]), pad(depositEvent.topics[2])] as any,
  });

  const sharesToReceive = decodedDepositEvent.args.shares;

  return { sharesToReceive };
}

export async function simulateWithdrawTenderly(
  account: Address,
  strategy: Address,
  amount: string,
  decimals: number
): Promise<FetchData<PreviewWithdraw>> {
  if (parseEther(amount) === 0n) {
    return buildSuccessfulFetch({ assetsToReceive: 0n });
  }

  const { result } = await simulateBundleTenderly([createWithdrawTx(account, strategy, amount, decimals)]);

  if (!result || !result[0].logs) throw new Error("Failed to simulate transactions");

  const { logs } = result[0];

  // Withdraw event is the last event
  const withdrawEvent = logs ? logs[logs.length - 1].raw : undefined;

  if (!withdrawEvent) throw new Error("Failed to find withdraw event");

  const decodedWithdrawEvent = decodeEventLog({
    abi: withdrawEventAbi,
    data: withdrawEvent.data,
    topics: [
      withdrawEvent.topics[0],
      pad(withdrawEvent.topics[1]),
      pad(withdrawEvent.topics[2]),
      pad(withdrawEvent.topics[3]),
    ] as any,
  });

  return buildSuccessfulFetch({ assetsToReceive: decodedWithdrawEvent.args.assets });
}

async function simulateBundleAlchemy(functionCalls: any) {
  const res = await fetch(alchemySimulationRpc, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_simulateExecutionBundle",
      params: [functionCalls],
    }),
  });

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error("Failed to simulate transactions");
    throw new Error(`Failed to simulate transactions, error: ${res.statusText}`);
  }
  return res.json();
}

export async function simulateDepositAlchemy(
  account: Address,
  strategy: Address,
  underlyingAsset: Address,
  amount: string,
  decimals: number
): Promise<PreviewDeposit> {
  if (parseEther(amount) === 0n) throw new Error("Invalid amount");

  const { result } = await simulateBundleAlchemy([
    createApproveTx(account, underlyingAsset, strategy, amount, decimals),
    createDepositTx(account, strategy, amount, decimals),
  ]);

  if (!result || !result[1].logs) throw new Error("Failed to simulate transactions");

  // Take logs from second transaction
  const { logs } = result[1];
  // Deposit even is the last event
  const depositEvent = logs ? logs[logs.length - 1] : undefined;

  if (!depositEvent) throw new Error("Failed to find deposit event");

  const decodedDepositEvent = decodeEventLog({
    abi: depositEventAbi,
    data: depositEvent.data,
    topics: [depositEvent.topics[0], pad(depositEvent.topics[1]), pad(depositEvent.topics[2])] as any,
  });

  const sharesToReceive = decodedDepositEvent.args.shares;
  return { sharesToReceive };
}

export async function simulateWithdrawAlchemy(
  account: Address,
  strategy: Address,
  amount: string,
  decimals: number
): Promise<FetchData<PreviewWithdraw>> {
  if (parseEther(amount) === 0n) {
    return buildSuccessfulFetch({ assetsToReceive: 0n });
  }

  const { result } = await simulateBundleAlchemy([createWithdrawTx(account, strategy, amount, decimals)]);

  if (!result || !result[0].logs) throw new Error("Failed to simulate transactions");

  const { logs } = result[0];
  // Withdraw event is the last event
  const withdrawEvent = logs ? logs[logs.length - 1] : undefined;

  if (!withdrawEvent) throw new Error("Failed to find withdraw event");

  const decodedWithdrawEvent = decodeEventLog({
    abi: withdrawEventAbi,
    data: withdrawEvent.data,
    topics: [
      withdrawEvent.topics[0],
      pad(withdrawEvent.topics[1]),
      pad(withdrawEvent.topics[2]),
      pad(withdrawEvent.topics[3]),
    ] as any,
  });

  return buildSuccessfulFetch({ assetsToReceive: decodedWithdrawEvent.args.assets });
}

export async function simulateDeposit(
  account: Address,
  strategy: Address,
  underlyingAsset: Address,
  amount: string,
  decimals: number
): Promise<PreviewDeposit> {
  const isSimulatingWithTenderly = import.meta.env.VITE_USE_TENDERLY_SIMULATION === "true";

  return isSimulatingWithTenderly
    ? simulateDepositTenderly(account, strategy, underlyingAsset, amount, decimals)
    : simulateDepositAlchemy(account, strategy, underlyingAsset, amount, decimals);
}

export async function simulateWithdraw(
  account: Address,
  strategy: Address,
  amount: string,
  decimals: number
): Promise<FetchData<PreviewWithdraw>> {
  const isSimulatingWithTenderly = import.meta.env.VITE_USE_TENDERLY_SIMULATION === "true";

  return isSimulatingWithTenderly
    ? simulateWithdrawTenderly(account, strategy, amount, decimals)
    : simulateWithdrawAlchemy(account, strategy, amount, decimals);
}
