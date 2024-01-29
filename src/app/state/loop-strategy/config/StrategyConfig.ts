import { Address } from "viem";
import { CBETH_ADDRESS, WETH_ADDRESS } from "../../../meta/constants";

interface AssetConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
}

export interface StrategyConfig {
  name: string;
  address: Address;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
}

export const ilmStrategies: StrategyConfig[] = [
  {
    name: "cbETH Booster",
    address: "0xbf7163E07Cb778E3D6216d249Bd64fa7c86B6Da2",
    underlyingAsset: {
      name: "Coinbase Staked ETH",
      symbol: "cbETH",
      address: CBETH_ADDRESS,
      logo: "src/assets/cbeth.svg",
    },
    debtAsset: {
      name: "Ethereum",
      symbol: "ETH",
      address: WETH_ADDRESS,
      logo: "src/assets/eth.svg",
    },
  },
];
