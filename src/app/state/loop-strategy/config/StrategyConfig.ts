import { Address } from "viem";
import {
  CBETH_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
} from "../../../meta/constants";
//TODO: Change this to strategy logo once it's known
import ilmcbETHLogo from "../../../../assets/tokens/ilmcbETH.svg";
import ilmwstETHLogo from "../../../../assets/tokens/ilmwstETH.svg";
import EthLogo from "../../../../assets/tokens/eth.svg";
import CBETHImage from "../../../../assets/tokens/cbeth.svg";
import WstEthLogo from "../../../../assets/tokens/wsteth.svg";

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
    symbol: "ilmcbETH",
    address: "0x08dd8c0b5E660800970410f6Ab3e61727599501F",
    logo: ilmcbETHLogo,
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
    symbol: "ilmwstETH",
    address: "0x78390FdE18B72E4905F68f3B110c3B4D99Cf725A",
    logo: ilmwstETHLogo,
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
