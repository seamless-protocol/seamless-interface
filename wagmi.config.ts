import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { ILMRegistryAbi } from "./abis/ILMRegistry";
import { LendingPoolAbi } from "./abis/LendingPool";
import { LeverageManagerAbi } from "./abis/LeverageManager";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { PoolDataProviderAbi } from "./abis/PoolDataProvider";
import { ProtocolDataProviderAbi } from "./abis/ProtocolDataProvider";
import { RewardsControllerAbi } from "./abis/RewardsController";
import { UIIncentiveDataProviderAbi } from "./abis/UIIncentiveDataProvider";

export default defineConfig({
  out: "src/app/generated/generated.ts",
  contracts: [
    {
      name: "LoopStrategy",
      abi: LoopStrategyAbi,
    },
    {
      name: "ILMRegistry",
      address: "0x36291d2D51a0122B9faCbE3c3F989cc6b1f859B3",
      abi: ILMRegistryAbi,
    },
    {
      name: "AaveOracle",
      address: "0xFDd4e83890BCcd1fbF9b10d71a5cc0a738753b01",
      abi: AaveOracleAbi,
    },
    {
      name: "LendingPool",
      address: "0x8F44Fd754285aa6A2b8B9B97739B79746e0475a7",
      abi: LendingPoolAbi,
    },
    {
      name: "IncentiveDataProvider",
      address: "0x3F5a90eF7BC3eE64e1E95b850DbBC2469fF71ce8",
      abi: UIIncentiveDataProviderAbi,
    },
    {
      name: "ProtocolDataProvider",
      address: "0x2A0979257105834789bC6b9E1B00446DFbA8dFBa",
      abi: ProtocolDataProviderAbi,
    },
    {
      name: "PoolDataProvider",
      address: "0xB7397f841a449793c634C06Cf12751d256b9bf50",
      abi: PoolDataProviderAbi,
    },
    {
      name: "RewardsController",
      address: "0x91Ac2FfF8CBeF5859eAA6DdA661feBd533cD3780",
      abi: RewardsControllerAbi,
    },
    {
      name: "LeverageManager",
      address: "0x66dc1b08F8e19F81430b034218fce3dD7CF7F8E1",
      abi: LeverageManagerAbi,
    },
  ],
  plugins: [react()],
});
