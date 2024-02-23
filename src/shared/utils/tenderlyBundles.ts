import { Address, Hex, decodeEventLog } from "viem";
import { Tenderly, Network } from "@tenderly/sdk";
import {
  createApproveTx,
  createDepositTx,
  createWithdrawTx,
} from "./tenderlyHelpers";
import { depositEventAbi } from "../../../abis/DepositEvent";
import { withdrawEventAbi } from "../../../abis/WithdrawEvent";
import { StrategyConfig } from "../../app/state/loop-strategy/config/StrategyConfig";

export interface PreviewDeposit {
  isSuccess: boolean;
  sharesToReceive: bigint;
}

export interface PreviewWithdraw {
  isSuccess: boolean;
  assetsToReceive: bigint;
}

export const tenderlyInstance = new Tenderly({
  accountName: import.meta.env.VITE_TENDERLY_ACCOUNT_NAME as string,
  projectName: import.meta.env.VITE_TENDERLY_PROJECT_NAME as string,
  accessKey: import.meta.env.VITE_TENDERLY_ACCESS_KEY as string,
  network: Network.BASE,
});

export async function simulateDeposit(
  account: Address,
  amount: string,
  strategyConfig: StrategyConfig,
  blockNumber: bigint
): Promise<PreviewDeposit> {
  try {
    const result = await tenderlyInstance.simulator.simulateBundle({
      transactions: [
        createApproveTx(
          account,
          strategyConfig.underlyingAsset.address,
          strategyConfig.address,
          amount
        ),
        createDepositTx(account, strategyConfig.address, amount),
      ],
      blockNumber: Number(blockNumber),
    });

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
    return {
      isSuccess: false,
      sharesToReceive: 0n,
    };
  }
}

export async function simulateWithdraw(
  account: Address,
  amount: string,
  strategyConfig: StrategyConfig,
  blockNumber: bigint
): Promise<PreviewWithdraw> {
  try {
    const result = await tenderlyInstance.simulator.simulateTransaction({
      transaction: createWithdrawTx(account, strategyConfig.address, amount),
      blockNumber: Number(blockNumber),
    });

    if (!result || !result.status || !result.logs) {
      return {
        isSuccess: false,
        assetsToReceive: 0n,
      };
    }

    const logs = result.logs;
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
    return {
      isSuccess: false,
      assetsToReceive: 0n,
    };
  }
}
