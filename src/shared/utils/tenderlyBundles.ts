import { Address, Hex, decodeEventLog, parseEther } from "viem";
import {
  createApproveTx,
  createDepositTx,
  createWithdrawTx,
} from "./tenderlyHelpers";
import { depositEventAbi } from "../../../abis/DepositEvent";
import { withdrawEventAbi } from "../../../abis/WithdrawEvent";

export interface PreviewDeposit {
  isSuccess: boolean;
  sharesToReceive: bigint;
}

export interface PreviewWithdraw {
  isSuccess: boolean;
  assetsToReceive: bigint;
}

const tenderlyNodeAccessKey = import.meta.env.VITE_TENDERLY_NODE_ACCESS_KEY;

async function simulateBundle(functionCalls: any) {
  try {
    const res = await fetch(
      `https://base.gateway.tenderly.co/${tenderlyNodeAccessKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          jsonrpc: "2.0",
          method: "tenderly_simulateBundle",
          params: [functionCalls, "latest"],
        }),
      }
    );

    if (!res.ok) {
      console.error("Failed to simulate transactions");
      return null;
    }

    return await res.json();
  } catch (e) {
    console.error("Failed to simulate transactions", e);
    return null;
  }
}

export async function simulateDeposit(
  account: Address,
  strategy: Address,
  underlyingAsset: Address | undefined,
  amount: string
): Promise<PreviewDeposit> {
  if (!underlyingAsset || parseEther(amount) === 0n) {
    return {
      isSuccess: true,
      sharesToReceive: 0n,
    };
  }

  try {
    const { result } = await simulateBundle([
      createApproveTx(account, underlyingAsset, strategy, amount),
      createDepositTx(account, strategy, amount),
    ]);

    if (!result || !result[1].status || !result[1].logs) {
      return {
        isSuccess: false,
        sharesToReceive: 0n,
      };
    }

    // Take logs from second transaction
    const logs = result[1].logs;
    // Deposit even is the last event
    const depositEvent = logs[logs?.length - 1];

    if (!depositEvent || !depositEvent.raw) {
      return {
        isSuccess: false,
        sharesToReceive: 0n,
      };
    }

    const decodedDepositEvent = decodeEventLog({
      abi: depositEventAbi,
      data: depositEvent.raw.data as Hex,
      topics: depositEvent.raw.topics as [],
    });

    const sharesToReceive = decodedDepositEvent.args.shares;
    return {
      isSuccess: true,
      sharesToReceive,
    };
  } catch (e) {
    console.error("Failed to simulate deposit");
    return {
      isSuccess: false,
      sharesToReceive: 0n,
    };
  }
}

export async function simulateWithdraw(
  account: Address,
  strategy: Address,
  amount: string
): Promise<PreviewWithdraw> {
  if (parseEther(amount) === 0n) {
    return {
      isSuccess: true,
      assetsToReceive: 0n,
    };
  }

  try {
    const { result } = await simulateBundle([
      createWithdrawTx(account, strategy, amount),
    ]);

    if (!result || !result[0].status || !result[0].logs) {
      return {
        isSuccess: false,
        assetsToReceive: 0n,
      };
    }

    const logs = result[0].logs;
    // Withdraw event is the last event
    const withdrawEvent = logs[logs?.length - 1];

    if (!withdrawEvent || !withdrawEvent.raw) {
      return {
        isSuccess: false,
        assetsToReceive: 0n,
      };
    }

    const decodedWithdrawEvent = decodeEventLog({
      abi: withdrawEventAbi,
      data: withdrawEvent.raw.data as Hex,
      topics: withdrawEvent.raw.topics as [],
    });

    return {
      isSuccess: true,
      assetsToReceive: decodedWithdrawEvent.args.assets,
    };
  } catch (e) {
    console.error("Failed to simulate withdraw");
    return {
      isSuccess: false,
      assetsToReceive: 0n,
    };
  }
}
