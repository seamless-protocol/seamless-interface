import {
  ethLong,
  ethLong_3x,
  BRETT_ADDRESS,
  ESSEAM_ADDRESS,
  OG_POINTS_ADDRESS,
  SEAM_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  ethShort_ADDRESS_1_5_x,
  wstETHBooster_ADDRESS,
  WSTETH_ADDRESS,
} from "@meta";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";

import seamLogo from "@assets/logos/logo-seamless.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import ogPointsLogo from "@assets/tokens/og-points.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";

import ETH_USDC_1_5x_LongImage from "@assets/diagrams/ETH_USDC_1_5x_Long.png";
import ETH_USDC_3xLongImage from "@assets/diagrams/ETH_USDC_3xLong.png";
import USDC_ETH_1_5x_ShortImage from "@assets/diagrams/USDC_ETH_1_5x_Short.png";
import wstETH_ETH_3x_StakingImage from "@assets/diagrams/wstETH_ETH_3x_Staking.png";

export interface StrategyConfig {
  name: string;
  description: string;
  type: TagType;
  diagram: string;
}

export const strategyConfig: { [key: Address]: StrategyConfig } = {
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    type: "Staking",
    diagram: wstETH_ETH_3x_StakingImage,
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    type: "Long",
    diagram: ETH_USDC_1_5x_LongImage,
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    type: "Long",
    diagram: ETH_USDC_3xLongImage,
  },
  [ethShort_ADDRESS_1_5_x]: {
    name: "ETH Short 1.5x",
    description: "For ETH Bears, increase ETH price exposure by 1.5 times short.",
    type: "Short",
    diagram: USDC_ETH_1_5x_ShortImage,
  },
};

export const addressIconMap: Map<string, string> = new Map([
  [SEAM_ADDRESS, seamLogo],
  [ESSEAM_ADDRESS, seamLogo],
  [OG_POINTS_ADDRESS, ogPointsLogo],
  [USDC_ADDRESS, usdcLogo],
  [BRETT_ADDRESS, brettLogo],
  [WETH_ADDRESS, wethLogo],
  [wstETHBooster_ADDRESS, wstETHIlmIcon],
  [ethLong, ilmIcon],
  [ethLong_3x, ilmIcon],
  [ethShort_ADDRESS_1_5_x, ilmIcon],
  [WSTETH_ADDRESS, wsteth],
]);
