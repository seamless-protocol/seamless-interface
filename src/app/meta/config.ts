import { CBETH_ADDRESS } from "./constants";
import { StrategyConfig } from "./types";

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
  },
];
