import { defineConfig } from "@wagmi/cli";
import { erc20Abi } from "viem";
import { LoopStrategyAbi } from "./abis/LoopStrategy";
import { AaveOracleAbi } from "./abis/AaveOracle";

export default defineConfig({
  out: "src/generated/generated.ts",
  contracts: [
    {
      name: "Seam",
      address: "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85",
      abi: erc20Abi,
    },
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
  plugins: [],
});
