import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  rwstETH_ADDRESS,
  sWETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "./constants";
import { Address } from "viem";

import wethLogo from "@assets/tokens/weth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import ilmwstETHLogo from "@assets/tokens/ilmwstETH.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import daiLogo from "@assets/tokens/dai.svg";
import usdcLogo from "@assets/tokens/usdc.svg";

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
    name: "Staked Wrapped Ethereum",
    shortName: "sWETH",
    logo: WstEthLogo,
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid staked ETH",
    shortName: "wstETH",
    logo: WstEthLogo,
  },
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Booster",
    logo: ilmwstETHLogo,
  },
  // Adding the missing contracts
  [CBETH_ADDRESS]: {
    name: "Compound Wrapped ETH",
    shortName: "cBETH",
    logo: cbethLogo,
  },
  [USDBC_ADDRESS]: {
    name: "USD Binance Coin",
    shortName: "USDBC",
    logo: usdbcLogo,
  },
  [DAI_ADDRESS]: {
    name: "Dai Stablecoin",
    shortName: "DAI",
    logo: daiLogo,
  },
  [USDC_ADDRESS]: {
    name: "USD Coin",
    shortName: "USDC",
    logo: usdcLogo,
  },
  [rwstETH_ADDRESS]: {
    name: "Rewrapped stETH",
    shortName: "rwstETH",
    logo: WstEthLogo, // todo rwstETH icon
  },
};
