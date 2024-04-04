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
  address: Address;
  logo: string;
  diagram: string;
  defaultApy: number;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
}

//TODO: Remove this array when new design is implemented
export const ilmStrategies: StrategyConfig[] = [
  {
    name: "wstETH Booster",
    address: "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e",
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
    defaultApy: 0,
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

export interface StrategyData {
  address: Address;
  defaultApy: number;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

//TODO: Remove this when dynamic fetching from contracts/subgraph is implemented
// Strategy with highest multiple needs to be last in the array
export const ilmAssetStrategiesMap: Map<Address, StrategyData[]> = new Map([
  [
    "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452",
    [
      {
        address: "0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e",
        defaultApy: 0,
        targetMultiple: {
          value: 3,
          symbol: "x",
        },
      },
    ],
  ],
]);
