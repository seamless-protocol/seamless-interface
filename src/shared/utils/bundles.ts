import { Address, decodeEventLog, pad, parseEther } from "viem";
import { createApproveTx, createDepositTx, createWithdrawTx } from "./bundlesHelpers";
import { depositEventAbi } from "../../../abis/DepositEvent";
import { withdrawEventAbi } from "../../../abis/WithdrawEvent";
import { FetchData } from "../types/Fetch";

export interface PreviewDeposit {
  sharesToReceive: bigint;
}

export interface PreviewWithdraw {
  isSuccess: boolean;
  assetsToReceive: bigint;
}

const alchemySimulationRpc = import.meta.env.VITE_ALCHEMY_SIMULATION_RPC_URL;

async function simulateBundle(functionCalls: any) {
  try {
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
      return null;
    }
    return await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to simulate transactions", e);
    return null;
  }
}

export async function simulateDeposit(
  account: Address,
  strategy: Address,
  underlyingAsset: Address | undefined,
  amount: string
): Promise<FetchData<PreviewDeposit>> {
  if (!underlyingAsset || parseEther(amount) === 0n) {
    return {
      isSuccess: true,
      isFetched: true,
      isLoading: false,
      data: { sharesToReceive: 0n },
    };
  }

  const { result } = await simulateBundle([
    createApproveTx(account, underlyingAsset, strategy, amount),
    createDepositTx(account, strategy, amount),
  ]);

  if (!result || !result[1].logs) {
    return {
      isSuccess: true,
      isFetched: true,
      isLoading: false,
      data: { sharesToReceive: 0n },
    };
  }

  // Take logs from second transaction
  const { logs } = result[1];
  // Deposit even is the last event
  const depositEvent = logs ? logs[logs.length - 1] : undefined;

  if (!depositEvent) {
    return {
      isSuccess: true,
      isFetched: true,
      isLoading: false,
      data: { sharesToReceive: 0n },
    };
  }

  const decodedDepositEvent = decodeEventLog({
    abi: depositEventAbi,
    data: depositEvent.data,
    topics: [depositEvent.topics[0], pad(depositEvent.topics[1]), pad(depositEvent.topics[2])] as any,
  });

  const sharesToReceive = decodedDepositEvent.args.shares;
  return {
    isSuccess: true,
    isFetched: true,
    isLoading: false,
    data: { sharesToReceive },
  };
}

export async function simulateWithdraw(account: Address, strategy: Address, amount: string): Promise<PreviewWithdraw> {
  if (parseEther(amount) === 0n) {
    return {
      isSuccess: true,
      assetsToReceive: 0n,
    };
  }

  try {
    const { result } = await simulateBundle([createWithdrawTx(account, strategy, amount)]);

    if (!result || !result[0].logs) {
      return {
        isSuccess: false,
        assetsToReceive: 0n,
      };
    }

    const { logs } = result[0];
    // Withdraw event is the last event
    const withdrawEvent = logs ? logs[logs.length - 1] : undefined;

    if (!withdrawEvent) {
      return {
        isSuccess: false,
        assetsToReceive: 0n,
      };
    }

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

    return {
      isSuccess: true,
      assetsToReceive: decodedWithdrawEvent.args.assets,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to simulate withdraw", e);
    return {
      isSuccess: false,
      assetsToReceive: 0n,
    };
  }
}
