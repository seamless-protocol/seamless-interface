import { loopStrategyAbi } from "@generated";
import { Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";

const TENDERLY_SIMULATION_GAS = 1000000000;
const TENDERLY_SIMULATION_GAS_PRICE = "10000000";

function createTx(from: Address, to: Address, input: string) {
  return {
    from,
    to,
    gas: TENDERLY_SIMULATION_GAS,
    gas_price: TENDERLY_SIMULATION_GAS_PRICE,
    value: 0,
    input,
  };
}

export function createApproveTx(
  account: Address,
  asset: Address,
  spender: Address,
  amount: string
) {
  return createTx(
    account,
    asset,
    encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, parseUnits(amount, 18)],
    })
  );
}

export function createDepositTx(
  account: Address,
  strategyAddress: Address,
  amount: string
) {
  return createTx(
    account,
    strategyAddress,
    encodeFunctionData({
      abi: loopStrategyAbi,
      functionName: "deposit",
      args: [parseUnits(amount, 18), account],
    })
  );
}

export function createWithdrawTx(
  account: Address,
  strategyAddress: Address,
  amount: string
) {
  return createTx(
    account,
    strategyAddress,
    encodeFunctionData({
      abi: loopStrategyAbi,
      functionName: "redeem",
      args: [parseUnits(amount, 18), account, account],
    })
  );
}
