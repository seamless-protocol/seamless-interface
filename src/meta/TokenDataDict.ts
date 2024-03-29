import {
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  sWETH_ADDRESS,
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
    logo: string;
  };
}

export const TokenDataDict: ITokenDataDict = {
  [WETH_ADDRESS]: {
    name: "Wrapped Ethereum",
    shortName: "WETH",
    logo: wethLogo,
  },
  [sWETH_ADDRESS]: {
    name: "Wrapped Ethereum",
    shortName: "WETH",
    logo: WstEthLogo,
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid staked ETH",
    logo: WstEthLogo,
  },
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Booster",
    logo: ilmwstETHLogo,
  },
};
