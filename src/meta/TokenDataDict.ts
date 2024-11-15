import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  sWETH_ADDRESS,
  wstETHBooster_3x,
  DEGEN_ADDRESS,
  SEAM_ADDRESS,
  ethLong_1_5x,
  AERO_ADDRESS,
  BRETT_ADDRESS,
} from "./constants";
import { Address } from "viem";

import wethLogo from "@assets/tokens/weth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import ilmwstETHLogo from "@assets/tokens/ilmWstethEth.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import ethLongLogo from "@assets/tokens/ilmEthUsdc.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import daiLogo from "@assets/tokens/dai.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import degenLogo from "@assets/tokens/degen.svg";
import seamLogo from "@assets/tokens/seam.svg";
import aeroLogo from "@assets/tokens/aero.svg";
import brettLogo from "@assets/tokens/brett.svg";

interface ITokenDataDict {
  [address: Address]: {
    name?: string;
    nameOverride?: string;
    logo: string;
  };
}

export const TokenDataDict: ITokenDataDict = {
  [WETH_ADDRESS]: {
    logo: wethLogo,
  },
  [sWETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [WSTETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [wstETHBooster_3x]: {
    name: "wstETH Booster",
    logo: ilmwstETHLogo,
  },
  [ethLong_1_5x]: {
    name: "Multiply ETH Long",
    logo: ethLongLogo,
  },
  // Adding the missing contracts
  [CBETH_ADDRESS]: {
    logo: cbethLogo,
  },
  [USDBC_ADDRESS]: {
    logo: usdbcLogo,
  },
  [DAI_ADDRESS]: {
    logo: daiLogo,
  },
  [USDC_ADDRESS]: {
    logo: usdcLogo,
  },
  [DEGEN_ADDRESS]: {
    logo: degenLogo,
  },
  [SEAM_ADDRESS]: {
    logo: seamLogo,
  },
  [AERO_ADDRESS]: {
    logo: aeroLogo,
  },
  [BRETT_ADDRESS]: {
    logo: brettLogo,
  },
};
