import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import seamIcon from "@assets/logos/logo-seamless.svg";
import brettIcon from "@assets/tokens/brett.svg";
import cbBTCIcon from "@assets/tokens/cbBTC.svg";
import esSeamIcon from "@assets/tokens/esSeam.svg";
import ilmcbBTCIcon from "@assets/tokens/ilmcbBTC.svg";
import ogPointsIcon from "@assets/tokens/og-points.svg";
import stakedSEAMIcon from "@assets/tokens/stakedSEAM.svg";
import usdcIcon from "@assets/tokens/usdc.svg";
import weethIcon from "@assets/tokens/weeth.svg";
import wethIcon from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";
import {
  BRETT_ADDRESS,
  cbBTC_ADDRESS,
  cbBTCLong_1_5x,
  cbBTCLong_3x,
  ESSEAM_ADDRESS,
  ethLong_1_5x,
  ethLong_3x,
  ethShort_ADDRESS_1_5_x,
  OG_POINTS_ADDRESS,
  SEAM_ADDRESS,
  seamlesscbBTCMorphoVault,
  seamlessETHMorphoVault,
  seamlessUSDCMorphoVault,
  STAKED_SEAM_ADDRESS,
  USDC_ADDRESS,
  WEETH_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  wstETHBooster_3x,
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
  [WEETH_ADDRESS, weethIcon],
]);
