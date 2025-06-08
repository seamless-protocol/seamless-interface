import seamIcon from "@assets/logos/logo-seamless.svg";
import esSeamIcon from "@assets/tokens/esSeam.svg";
import usdcIcon from "@assets/tokens/usdc.svg";
import ogPointsIcon from "@assets/tokens/og-points.svg";
import brettIcon from "@assets/tokens/brett.svg";
import wethIcon from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";
import stakedSEAMIcon from "@assets/tokens/stakedSEAM.svg";
import ilmcbBTCIcon from "@assets/tokens/ilmcbBTC.svg";
import cbBTCIcon from "@assets/tokens/cbBTC.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import wstETH_ETH_3x_StakingIcon from "@assets/tokens/weETH_ETH LT Strategy.svg";
import {
  SEAM_ADDRESS,
  ESSEAM_ADDRESS,
  OG_POINTS_ADDRESS,
  USDC_ADDRESS,
  BRETT_ADDRESS,
  WETH_ADDRESS,
  wstETHBooster_3x,
  ethLong_1_5x,
  ethLong_3x,
  ethShort_ADDRESS_1_5_x,
  WSTETH_ADDRESS,
  cbBTCLong_1_5x,
  cbBTCLong_3x,
  cbBTC_ADDRESS,
  seamlessUSDCMorphoVault,
  seamlesscbBTCMorphoVault,
  seamlessETHMorphoVault,
  STAKED_SEAM_ADDRESS,
  weeth_weth_leverage_token,
} from "./constants";

/* --------- */
/*   Icons   */
/* --------- */
export const addressIconMap: Map<string, string> = new Map([
  [SEAM_ADDRESS, seamIcon],
  [ESSEAM_ADDRESS, esSeamIcon],
  [OG_POINTS_ADDRESS, ogPointsIcon],
  [USDC_ADDRESS, usdcIcon],
  [BRETT_ADDRESS, brettIcon],
  [WETH_ADDRESS, wethIcon],
  [wstETHBooster_3x, wstETHIlmIcon],
  [ethLong_1_5x, ilmIcon],
  [ethLong_3x, ilmIcon],
  [ethShort_ADDRESS_1_5_x, ilmIcon],
  [WSTETH_ADDRESS, wsteth],
  [cbBTCLong_1_5x, ilmcbBTCIcon],
  [cbBTCLong_3x, ilmcbBTCIcon],
  [cbBTC_ADDRESS, cbBTCIcon],
  [seamlessUSDCMorphoVault, usdcIcon],
  [seamlesscbBTCMorphoVault, cbBTCIcon],
  [seamlessETHMorphoVault, wethIcon],
  [STAKED_SEAM_ADDRESS, stakedSEAMIcon],
  [weeth_weth_leverage_token, wstETH_ETH_3x_StakingIcon],
]);
