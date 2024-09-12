import { Address } from "viem";
import { targetAccount, USDC_ADDRESS, WETH_ADDRESS, WSTETH_ADDRESS } from "../constants";

export interface IBalanceConfig {
  account: Address;
  tokenAddress: Address;
  balance: bigint;
}

export const BalanceConfig: IBalanceConfig[] = [
  {
    account: targetAccount,
    tokenAddress: USDC_ADDRESS,
    balance: BigInt(1000 * 1e6),
  },
  {
    account: targetAccount,
    tokenAddress: WETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  },
  {
    account: targetAccount,
    tokenAddress: WSTETH_ADDRESS,
    balance: BigInt(5 * 1e18),
  },
];
