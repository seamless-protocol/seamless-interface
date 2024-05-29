import { Address } from "viem";
// TODO: Change this to strategy logo once it's known
import ilmwstETHLogo from "@assets/tokens/ilmWstethEth.svg";
import ilmEthUsdcLogo from "@assets/tokens/ilmEthUsdc.svg";
import EthLogo from "@assets/tokens/eth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import wstEthDiagram from "@assets/wsteth-diagram.png";
import wethLogo from "@assets/tokens/weth.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import { WSTETH_ADDRESS, WETH_ADDRESS, USDC_ADDRESS, wstETHBooster_ADDRESS } from "@meta";

interface AssetConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
}

export interface StrategyConfig {
  id: number;
  name: string;
  address: Address;
  logo: string;
  diagram: string;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
  vaultsFyiLink?: string;
}

// TODO: Remove this array when new design is implemented
export const ilmStrategies: StrategyConfig[] = [
  {
    id: 0,
    name: "wstETH Booster",
    address: wstETHBooster_ADDRESS,
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
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
    vaultsFyiLink: `https://www.vaults.fyi/vaults/base/${wstETHBooster_ADDRESS}?apyMode=30day`,
  },
  {
    id: 1,
    name: "Multiply ETH Long",
    address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4",
    logo: ilmEthUsdcLogo,
    diagram: "", // TODO: Update this or remove because it is unused
    underlyingAsset: {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: WETH_ADDRESS,
      logo: wethLogo,
    },
    debtAsset: {
      name: "USDC",
      symbol: "USDC",
      address: USDC_ADDRESS,
      logo: usdcLogo,
    },
  },
];

export const findILMStrategyByAddress = (address?: Address) => {
  return ilmStrategies.find((strategy) => strategy.underlyingAsset.address === address);
};

export interface StrategyData {
  address: Address;
  targetMultiple: {
    value: number;
    symbol: string;
  };
}

// TODO: Remove this when dynamic fetching from contracts/subgraph is implemented
// Strategy with highest multiple needs to be last in the array
export const ilmAssetStrategiesMap: Map<Address, StrategyData[]> = new Map([
  [
    WSTETH_ADDRESS,
    [
      {
        address: wstETHBooster_ADDRESS,
        targetMultiple: {
          value: 3,
          symbol: "x",
        },
      },
      // {
      //   // test address, replace with real one
      //   address: "0x258730e23cF2f25887Cb962d32Bd10b878ea8zzz",
      //   targetMultiple: {
      //     value: 5,
      //     symbol: "x",
      //   },
      // },
    ],
  ],
  [
    WETH_ADDRESS,
    [
      {
        address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4",
        targetMultiple: {
          value: 1.5,
          symbol: "x",
        },
      },
    ],
  ],
]);
