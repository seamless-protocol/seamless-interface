import { Address } from "viem";
import { WETH_ADDRESS, WSTETH_ADDRESS } from "../../../meta/constants";
//TODO: Change this to strategy logo once it's known
import ilmwstETHLogo from "../../../../assets/ilmwstETH.svg";
import EthLogo from "../../../../assets/eth.svg";
import WstEthLogo from "../../../../assets/wsteth.svg";
import wstEthDiagram from "../../../../assets/wsteth-diagram.svg";

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
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
}

export const ilmStrategies: StrategyConfig[] = [
  {
    name: "wstETH Booster",
    symbol: "ilmwstETH",
    address: "0x78390FdE18B72E4905F68f3B110c3B4D99Cf725A",
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
  },
];
