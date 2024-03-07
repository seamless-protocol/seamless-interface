import { defineConfig } from "@wagmi/cli";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { LendingPoolAbi } from "./abis/LendingPool";
import { react } from "@wagmi/cli/plugins";
import { UIIncentiveDataProviderAbi } from "./abis/UIIncentiveDataProvider";
import { ProtocolDataProviderAbi } from "./abis/ProtocolDataProvider";

export default defineConfig({
  out: "src/app/generated/generated.ts",
  contracts: [
    {
      name: "LoopStrategy",
      abi: LoopStrategyAbi,
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
  ],
  plugins: [react()],
});
