/* ----------- */
/*    Other    */
/* ------------ */
import {
  ethLong_1_5x,
  ethLong_3x,
  USDC_ADDRESS,
  WETH_ADDRESS,
  ethShort_ADDRESS_1_5_x,
  wstETHBooster_3x,
  WSTETH_ADDRESS,
  cbBTCLong_1_5x,
  cbBTCLong_3x,
  cbBTC_ADDRESS,
  seamlessUSDCMorphoVault,
  seamlesscbBTCMorphoVault,
  seamlessETHMorphoVault,
  STAKED_SEAM_ADDRESS,
} from "@meta";
import { TagType } from "../common/types/StateTypes";
import { Address } from "viem";

import ETH_USDC_1_5x_LongImage from "@assets/diagrams/ETH_USDC_1_5x_Long.png";
import ETH_USDC_3xLongImage from "@assets/diagrams/ETH_USDC_3xLong.png";
import USDC_ETH_1_5x_ShortImage from "@assets/diagrams/USDC_ETH_1_5x_Short.png";
import wstETH_ETH_3x_StakingImage from "@assets/diagrams/wstETH_ETH_3x_Staking.png";
import cbBTC_1_5x_LongImage from "@assets/diagrams/cbBTC_1_5x_Long.png";
import cbBTC_3x_LongImage from "@assets/diagrams/cbBTC_3x_Long.png";
import resolvIcon from "@assets/logos/resolv.svg";
import logoGauntlet from "@assets/logos/logo-gauntlet.svg";
import { LendMarketConfig } from "./configTypes";
import { assetsConfig } from "./landingMarketConfig";
import type { Curator } from "../morpho/types/Curator";

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

export interface PointsProgram {
  icon: string;
  viewValue: string;
  symbol?: string;
}

/* -------------- */
/*   Vault config */
/* -------------- */
export interface VaultConfig {
  name: string;
  description: string;
  curator?: Curator;
  type: TagType;

  pointsProgram?: PointsProgram;
}

export const vaultConfig: { [key: Address]: VaultConfig } = {
  [seamlessUSDCMorphoVault]: {
    name: "Seamless USDC Vault",
    description:
      "The Seamless USDC Vault curated by Gauntlet is intended to optimize risk-adjusted yield across high-demand collateral markets on Base.",
    type: "Vault",
    curator: {
      address: seamlessUSDCMorphoVault,
      name: "Gauntlet",
      icon: logoGauntlet,
    },
    pointsProgram: {
      icon: resolvIcon,
      viewValue: "Up to 5x points",
      symbol: "Resolv",
    },
  },
  [seamlesscbBTCMorphoVault]: {
    name: "Seamless cbBTC Vault",
    description:
      "The Seamless cbBTC Vault curated by Gauntlet is intended to optimize risk-adjusted yield across high-demand collateral markets on Base.",
    type: "Vault",
    curator: {
      address: seamlesscbBTCMorphoVault,
      name: "Gauntlet",
      icon: logoGauntlet,
    },
  },
  [seamlessETHMorphoVault]: {
    name: "Seamless WETH Vault",
    description:
      "The Seamless WETH Vault curated by Gauntlet is intended to optimize risk-adjusted yield across high-demand collateral markets on Base.",
    type: "Vault",
    curator: {
      address: seamlessETHMorphoVault,
      name: "Gauntlet",
      icon: logoGauntlet,
    },
  },
};

export const configuredVaultAddresses = Object.keys(vaultConfig) as Address[];

export const rewardsAccruingAssets: Address[] = [STAKED_SEAM_ADDRESS];
