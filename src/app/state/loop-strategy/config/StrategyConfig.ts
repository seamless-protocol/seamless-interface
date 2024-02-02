import { Address } from "viem";
import { CBETH_ADDRESS } from "../../../meta/constants";
//TODO: Change this to strategy logo once it's known
import CbEthStrategyLogo from "../../../../assets/favicon.svg";
import CBETHImage from "../../../../assets/cbeth.svg";

export interface StrategyConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
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
    address: "0x08dd8c0b5E660800970410f6Ab3e61727599501F",
    logo: CbEthStrategyLogo,
    underlyingAsset: {
      name: "Coinbase Staked ETH",
      symbol: "cbETH",
      address: CBETH_ADDRESS,
      logo: CBETHImage,
    },
  },
];
