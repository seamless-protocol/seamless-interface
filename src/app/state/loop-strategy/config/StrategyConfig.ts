import { Address } from "viem";
import {
  CBETH_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
} from "../../../meta/constants";
//TODO: Change this to strategy logo once it's known
import CbEthStrategyLogo from "../../../../assets/favicon.svg";
import CBETHImage from "../../../../assets/cbeth.svg";
import EthLogo from "../../../../assets/eth.svg";
import WstEthLogo from "../../../../assets/wsteth.svg";

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
  logo: any;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
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
    debtAsset: {
      name: "Ethereum",
      symbol: "ETH",
      address: WETH_ADDRESS,
      logo: EthLogo,
    },
  },
  {
    name: "wstETH Booster",
    symbol: "ilmWstEth",
    address: "0x78390FdE18B72E4905F68f3B110c3B4D99Cf725A",
    logo: CbEthStrategyLogo,
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
