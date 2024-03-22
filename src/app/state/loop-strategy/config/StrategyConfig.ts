import { Address } from "viem";
// TODO: Change this to strategy logo once it's known
import ilmwstETHLogo from "@assets/tokens/ilmwstETH.svg";
import EthLogo from "@assets/tokens/eth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import wstEthDiagram from "@assets/wsteth-diagram.png";
import { WSTETH_ADDRESS, WETH_ADDRESS } from "@meta";

interface AssetConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
}

export interface StrategyConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
  diagram: string;
  defaultApy: number;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
}

export const ilmStrategies: StrategyConfig[] = [
  {
    name: "wstETH Booster",
    symbol: "ilmwstETH",
    // 0x2962673cC60eE877768A38fa6d7FEe7468b3F09b
    address: "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e",
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
    defaultApy: 7.74,
    underlyingAsset: {
      name: "Wrapped liquid staked ETH",
      symbol: "wstETH",
      address: WSTETH_ADDRESS,
      logo: WstEthLogo,
    },
    debtAsset: {
      name: "Ethereum",
      symbol: "ETH",
      address: WETH_ADDRESS,
      logo: EthLogo,
    },
  },
];
