import { defineConfig } from "@wagmi/cli";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { LendingPoolAbi } from "./abis/LendingPool";
import { ILMRegistryAbi } from "./abis/ILMRegistry";
import { react } from "@wagmi/cli/plugins";
import { UIIncentiveDataProviderAbi } from "./abis/UIIncentiveDataProvider";
import { ProtocolDataProviderAbi } from "./abis/ProtocolDataProvider";
import { PoolDataProviderAbi } from "./abis/PoolDataProvider";
import { RewardsControllerAbi } from "./abis/RewardsController";
import { LeverageManagerAbi } from "./abis/LeverageManager";
import { EtherFiLeverageRouterAbi } from "./abis/EtherFiLeverageRouter";
import { UniswapV2RouterAbi } from "./abis/UniswapV2Router";
import { LeverageRouterAbi } from "./abis/LeverageRouter";
import { QuoterAbi } from "./abis/Qouter";
import { UniswapV3FactoryAbi } from "./abis/UniswapV3Factory";
import { AerodromeSlipstreamFactoryAbi } from "./abis/AerodromeSlipstreamFactory";
import { AerodromeQuoterAbi } from "./abis/AerodromeQuoterAbi";

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
    {
      name: "LeverageRouter",
      address: "0x92F04D478Ea99D8dcF564aAb6444DD347de1766e",
      abi: LeverageRouterAbi,
    },
    {
      name: "EtherFiLeverageRouter",
      address: "0x25E0D6E5a35Afeac83167B9A01dEa0a8E23853bE",
      abi: EtherFiLeverageRouterAbi,
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
