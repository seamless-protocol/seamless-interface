import { Address } from "viem";
import { CBETH_ADDRESS } from "../../../meta/constants";
import CBETHImage from "/public/cbeth.svg";

export interface StrategyConfig {
  name: string;
  symbol: string;
  address: Address;
  underlyingAsset: {
    name: string;
    symbol: string;
    address: Address;
    logo: string;
  };
}

export const ilmStrategies: StrategyConfig[] = [
  {
    name: "cbETH Booster",
    symbol: "ilmCbEth",
    address: "0xbf7163E07Cb778E3D6216d249Bd64fa7c86B6Da2",
    underlyingAsset: {
      name: "Coinbase Staked ETH",
      symbol: "cbETH",
      address: CBETH_ADDRESS,
      logo: CBETHImage,
    },
  },
];
