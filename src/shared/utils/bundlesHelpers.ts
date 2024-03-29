import { loopStrategyAbi } from "@generated";
import { Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";

export function createApproveTx(account: Address, asset: Address, spender: Address, amount: string) {
  return {
    from: account,
    to: asset,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, parseUnits(amount, 18)],
    }),
  };
}

export function createDepositTx(account: Address, strategyAddress: Address, amount: string) {
  return {
    from: account,
    to: strategyAddress,
    data: encodeFunctionData({
      abi: loopStrategyAbi,
      functionName: "deposit",
      args: [parseUnits(amount, 18), account],
    }),
  };
}

export function createWithdrawTx(account: Address, strategyAddress: Address, amount: string) {
  return {
    from: account,
    to: strategyAddress,
    data: encodeFunctionData({
      abi: loopStrategyAbi,
      functionName: "redeem",
      args: [parseUnits(amount, 18), account, account],
    }),
  };
}
