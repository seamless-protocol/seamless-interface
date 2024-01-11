import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { AaveOracleAbi } from "./abis/AaveOracle";
import { LoopStrategyAbi } from "./abis/LoopStrategy";

export default defineConfig({
  out: "src/generated.ts",
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
      address: "0x7ef82a438deb8ed6c9c533ca8348383331bd6a59",
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
