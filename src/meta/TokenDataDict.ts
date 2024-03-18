import {
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "./constants";
import { Address } from "viem";

import wethLogo from "@assets/tokens/weth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import ilmwstETHLogo from "@assets/tokens/ilmwstETH.svg";

interface ITokenDataDict {
  [address: Address]: {
    name: string;
    shortName?: string;
    logo?: string;
    symbol?: string;
    decimals?: number;
  };
}

export const TokenDataDict: ITokenDataDict = {
  [WETH_ADDRESS]: {
    name: "Wrapped Ethereum",
    shortName: "WETH",
    symbol: "WETH",
    logo: wethLogo,
    decimals: 18,
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid staked ETH",
    symbol: "wstETH",
    logo: WstEthLogo,
  },
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Booster",
    symbol: "ilmwstETH",
    logo: ilmwstETHLogo,
  },
};
