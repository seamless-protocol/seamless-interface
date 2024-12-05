/* ----------- */
/*    Other    */
/* ------------ */
import {
  ethLong_1_5x,
  ethLong_3x,
  BRETT_ADDRESS,
  ESSEAM_ADDRESS,
  OG_POINTS_ADDRESS,
  SEAM_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  ethShort_ADDRESS_1_5_x,
  wstETHBooster_3x,
  WSTETH_ADDRESS,
  cbBTCLong_1_5x,
  cbBTCLong_3x,
  cbBTC_ADDRESS,
} from "@meta";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";

/* ----------- */
/*    Icons    */
/* ----------- */
import seamLogo from "@assets/logos/logo-seamless.svg";
import esSeamLogo from "@assets/tokens/esSeam.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import ogPointsLogo from "@assets/tokens/og-points.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";
import ilmcbBTCIcon from "@assets/tokens/ilmcbBTC.svg";
import cbBTCIcon from "@assets/tokens/cbBTC.svg";

import ETH_USDC_1_5x_LongImage from "@assets/diagrams/ETH_USDC_1_5x_Long.png";
import ETH_USDC_3xLongImage from "@assets/diagrams/ETH_USDC_3xLong.png";
import USDC_ETH_1_5x_ShortImage from "@assets/diagrams/USDC_ETH_1_5x_Short.png";
import wstETH_ETH_3x_StakingImage from "@assets/diagrams/wstETH_ETH_3x_Staking.png";
import cbBTC_1_5x_LongImage from "@assets/diagrams/cbBTC_1_5x_Long.png";
import cbBTC_3x_LongImage from "@assets/diagrams/cbBTC_3x_Long.png";
import { LendMarketConfig } from "./configTypes";
import { assetsConfig } from "./landingMarketConfig";

export interface StrategyConfig {
  name: string;
  description: string;
  type: TagType;
  diagram: string;
  underlyingAsset: LendMarketConfig;
  debtAsset: LendMarketConfig;
}

/* ------------- */
/*   Config      */
/* ------------- */
export const strategyConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_3x]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    type: "Staking",
    diagram: wstETH_ETH_3x_StakingImage,
    underlyingAsset: assetsConfig[WSTETH_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
  },
  [ethLong_1_5x]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    type: "Long",
    diagram: ETH_USDC_1_5x_LongImage,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    type: "Long",
    diagram: ETH_USDC_3xLongImage,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
  },
  [ethShort_ADDRESS_1_5_x]: {
    name: "ETH Short 1.5x",
    description: "For ETH Bears, increase ETH price exposure by 1.5 times short.",
    type: "Short",
    diagram: USDC_ETH_1_5x_ShortImage,
    underlyingAsset: assetsConfig[USDC_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
  },
  [cbBTCLong_1_5x]: {
    name: "cbBTC Long 1.5x",
    description: "For BTC Bulls, increase cbBTC price exposure by 1.5 times long.",
    type: "Long",
    diagram: cbBTC_1_5x_LongImage,
    underlyingAsset: assetsConfig[cbBTC_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
  },
  [cbBTCLong_3x]: {
    name: "cbBTC Long 3x",
    description: "For BTC Bulls, increase cbBTC price exposure by 3 times long.",
    type: "Long",
    diagram: cbBTC_3x_LongImage,
    underlyingAsset: assetsConfig[cbBTC_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
  },
};

/* --------- */
/*   Icons   */
/* --------- */
export const addressIconMap: Map<string, string> = new Map([
  [SEAM_ADDRESS, seamLogo],
  [ESSEAM_ADDRESS, esSeamLogo],
  [OG_POINTS_ADDRESS, ogPointsLogo],
  [USDC_ADDRESS, usdcLogo],
  [BRETT_ADDRESS, brettLogo],
  [WETH_ADDRESS, wethLogo],
  [wstETHBooster_3x, wstETHIlmIcon],
  [ethLong_1_5x, ilmIcon],
  [ethLong_3x, ilmIcon],
  [ethShort_ADDRESS_1_5_x, ilmIcon],
  [WSTETH_ADDRESS, wsteth],
  [cbBTCLong_1_5x, ilmcbBTCIcon],
  [cbBTCLong_3x, ilmcbBTCIcon],
  [cbBTC_ADDRESS, cbBTCIcon],
]);
