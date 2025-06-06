import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { AerodromeQuoterAbi } from "./abis/AerodromeQuoterAbi";
import { AerodromeSlipstreamFactoryAbi } from "./abis/AerodromeSlipstreamFactory";
import { etherfiL2SyncPoolAbi } from "./abis/EtherfiL2SyncPool";
import { ILMRegistryAbi } from "./abis/ILMRegistry";
import { LendingPoolAbi } from "./abis/LendingPool";
import { LeverageManagerAbi } from "./abis/LeverageManager";
import { LeverageRouterAbi } from "./abis/LeverageRouter";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { PoolDataProviderAbi } from "./abis/PoolDataProvider";
import { ProtocolDataProviderAbi } from "./abis/ProtocolDataProvider";
import { QuoterAbi } from "./abis/Qouter";
import { RewardsControllerAbi } from "./abis/RewardsController";
import { UIIncentiveDataProviderAbi } from "./abis/UIIncentiveDataProvider";
import { UniswapV2RouterAbi } from "./abis/UniswapV2Router";
import { UniswapV3FactoryAbi } from "./abis/UniswapV3Factory";

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
      address: "0x38Ba21C6Bf31dF1b1798FCEd07B4e9b07C5ec3a8",
      abi: LeverageManagerAbi,
    },
    {
      name: "LeverageRouter",
      address: "0xDbA92fC3dc10a17b96b6E807a908155C389A887C",
      abi: LeverageRouterAbi,
    },
    {
      name: "EtherfiL2ModeSyncPool",
      address: "0xc38e046dfdadf15f7f56853674242888301208a5",
      abi: etherfiL2SyncPoolAbi,
    },
    {
      name: "UniswapV2Router02",
      address: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
      abi: UniswapV2RouterAbi,
    },
    { name: "UniswapQuoter", address: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a", abi: QuoterAbi },
    { name: " UniswapV3Factory", address: "0x33128a8fc17869897dce68ed026d694621f6fdfd", abi: UniswapV3FactoryAbi },
    {
      name: "AerodromeSlipstreamFactory",
      address: "0x5e7BB104d84c7CB9B682AaC2F3d509f5F406809A",
      abi: AerodromeSlipstreamFactoryAbi,
    },
    {
      name: "AerodromeQuoter",
      address: "0x254cF9E1E6e233aa1AC962CB9B05b2cfeAaE15b0",
      abi: AerodromeQuoterAbi,
    },
  ],
  plugins: [react()],
});
