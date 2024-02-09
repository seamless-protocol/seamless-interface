import { defineConfig } from "@wagmi/cli";
import { erc20Abi } from "viem";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { react } from "@wagmi/cli/plugins";

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
  ],
  plugins: [react()],
});
