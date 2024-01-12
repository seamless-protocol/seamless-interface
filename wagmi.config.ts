import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { LoopStrategyAbi } from "./abis/LoopStrategy";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "cbETH",
      address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
      abi: erc20Abi,
    },
    {
      name: "LoopStrategy",
      address: "0x20361754A07610af88D1Df54e7c8eC0Ba459A8d8",
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
