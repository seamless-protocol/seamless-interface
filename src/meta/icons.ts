import seamLogo from "@assets/logos/logo-seamless.svg";
import esSeamLogo from "@assets/tokens/esSeam.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import ogPointsLogo from "@assets/tokens/og-points.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";
import wsteth from "@assets/tokens/wsteth.svg";
import ilmcbBTCIcon from "@assets/tokens/ilmcbBTC.svg";
import cbBTCIcon from "@assets/tokens/cbBTC.svg";
import wstETHIlmIcon from "@assets/ilms/wstETH-ilm.svg";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
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
} from "./constants";

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
  [seamlessUSDCMorphoVault, usdcLogo],
  [seamlesscbBTCMorphoVault, cbBTCIcon],
]);
