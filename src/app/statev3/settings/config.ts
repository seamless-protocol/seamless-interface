import {
  wstETHBooster_ADDRESS,
  WSTETH_ADDRESS,
  WETH_ADDRESS,
  USDC_ADDRESS,
  AERO_ADDRESS,
  BRETT_ADDRESS,
  CBETH_ADDRESS,
  DAI_ADDRESS,
  DEGEN_ADDRESS,
  rWETH_ADDRESS,
  rwstETH_ADDRESS,
  scbETH_ADDRESS,
  sDAI_ADDRESS,
  sDEGEN_ADDRESS,
  SEAM_ADDRESS,
  ESSEAM_ADDRESS,
  srWETH_ADDRESS,
  srwstETH_ADDRESS,
  sSEAM_ADDRESS,
  sUSDbC_ADDRESS,
  sUSDC_ADDRESS,
  sWETH_ADDRESS,
  swstETH_ADDRESS,
  USDBC_ADDRESS,
  variableDebtSeamcbETH_ADDRESS,
  variableDebtSeamDAI_ADDRESS,
  variableDebtSeamDEGEN_ADDRESS,
  variableDebtSeamrWETH_ADDRESS,
  variableDebtSeamrwstETH_ADDRESS,
  variableDebtSeamSEAM_ADDRESS,
  variableDebtSeamUSDbC_ADDRESS,
  variableDebtSeamUSDC_ADDRESS,
  variableDebtSeamWETH_ADDRESS,
  variableDebtSeamwstETH_ADDRESS,
  ethLong,
  multiplyETH_ADDRESS_STRATEGY_ID,
  wstETHBooster_ADDRESS_STRATEGY_ID,
  ethLong_3x,
} from "@meta";
import ethLongIlm from "@assets/ilms/ethLong-ilm.svg";
import wstETHIlm from "@assets/ilms/wstETH-ilm.svg";
import ilmwstETHLogo from "@assets/tokens/ilmWstethEth.svg";
import ilmEthUsdcLogo from "@assets/tokens/ilmEthUsdc.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import wstEthDiagram from "@assets/wsteth-diagram.png";
import usdcLogo from "@assets/tokens/usdc.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import daiLogo from "@assets/tokens/dai.svg";
import seamLogo from "@assets/tokens/seam.svg";
import degenLogo from "@assets/tokens/degen.svg";
import aeroLogo from "@assets/tokens/aero.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";

import { Address } from "viem";
import { RouterConfig } from "../../router";
import { LendMarketConfig, StrategyConfig } from "./configTypes";
import { faqsData } from "./faqConfig";

export const assetsConfig: { [key: Address]: LendMarketConfig } = {
  [WETH_ADDRESS]: {
    name: "Wrapped Ethereum",
    address: WETH_ADDRESS,
    logo: wethLogo,
    sTokenAddress: sWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamWETH_ADDRESS,
    vaultsFyiLink: RouterConfig.Builder.vaults(sWETH_ADDRESS),
    description: "Wrapped Ethereum (WETH) allows Ethereum to be traded & used directly in smart contracts.",
  },
  [USDBC_ADDRESS]: {
    name: "USD Base Coin",
    address: USDBC_ADDRESS,
    logo: usdbcLogo,
    sTokenAddress: sUSDbC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDbC_ADDRESS,
    vaultsFyiLink: RouterConfig.Builder.vaults(sUSDbC_ADDRESS),
    description: "USD Base Coin (USDbC) is a stablecoin pegged to the USD, providing a stable value for transactions.",
  },
  [CBETH_ADDRESS]: {
    name: "Coinbase Wrapped Staked Ether",
    address: CBETH_ADDRESS,
    logo: cbethLogo,
    sTokenAddress: scbETH_ADDRESS,
    debtTokenAddress: variableDebtSeamcbETH_ADDRESS,
    vaultsFyiLink: RouterConfig.Builder.vaults(scbETH_ADDRESS),
    description: "Coinbase ETH (cbETH) represents Ethereum staked through Coinbase, earning interest over time.",
  },
  [USDC_ADDRESS]: {
    name: "USD Coin",
    address: USDC_ADDRESS,
    symbol: "USDC",
    logo: usdcLogo,
    sTokenAddress: sUSDC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDC_ADDRESS,
    description: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar.",
    vaultsFyiLink: RouterConfig.Builder.vaults(sUSDC_ADDRESS),
  },
  [DAI_ADDRESS]: {
    name: "Dai",
    address: DAI_ADDRESS,
    logo: daiLogo,
    sTokenAddress: sDAI_ADDRESS,
    debtTokenAddress: variableDebtSeamDAI_ADDRESS,
    vaultsFyiLink: RouterConfig.Builder.vaults(sDAI_ADDRESS),
    description: "Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar.",
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid Staked Ether 2.0",
    address: WSTETH_ADDRESS,
    logo: WstEthLogo,
    sTokenAddress: swstETH_ADDRESS,
    debtTokenAddress: variableDebtSeamwstETH_ADDRESS,
    vaultsFyiLink: RouterConfig.Builder.vaults(swstETH_ADDRESS),
    description:
      "wstETH is a wrapped version of stETH. Due to the nature of Lido, the amount of stETH on your balance is not constant - it changes daily as staking rewards come in.",
  },
  [DEGEN_ADDRESS]: {
    name: "Degen",
    address: DEGEN_ADDRESS,
    logo: degenLogo,
    sTokenAddress: sDEGEN_ADDRESS,
    debtTokenAddress: variableDebtSeamDEGEN_ADDRESS,
    useCoinGeckoPrice: true,
    description:
      "DEGEN is dubbed as the unofficial token created for the Farcaster community, a decentralized social network.",
  },
  [SEAM_ADDRESS]: {
    name: "Seamless",
    address: SEAM_ADDRESS,
    logo: seamLogo,
    sTokenAddress: sSEAM_ADDRESS,
    debtTokenAddress: variableDebtSeamSEAM_ADDRESS,
    useCoinGeckoPrice: true,
    description: "SEAM is the fair launch utility governance token of Seamless Protocol.",
  },
  [AERO_ADDRESS]: {
    name: "Aerodrome",
    address: AERO_ADDRESS,
    logo: aeroLogo,
    useCoinGeckoPrice: false,
    description: "AERO is a central trading and liquidity marketplace on Base.",
  },
  [BRETT_ADDRESS]: {
    name: "Brett",
    symbol: "BRETT",
    address: BRETT_ADDRESS,
    logo: brettLogo,
    useCoinGeckoPrice: true,
    description: "BRETT is PEPE's best friend on Base.",
  },
  [rwstETH_ADDRESS]: {
    address: rwstETH_ADDRESS,
    sTokenAddress: srwstETH_ADDRESS,
    debtTokenAddress: variableDebtSeamrwstETH_ADDRESS,
  },
  [rWETH_ADDRESS]: {
    address: rWETH_ADDRESS,
    sTokenAddress: srWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamrWETH_ADDRESS,
  },
  [ESSEAM_ADDRESS]: {
    address: ESSEAM_ADDRESS,
    useCoinGeckoPrice: true,
    coingGeckoConfig: {
      replaceAddress: SEAM_ADDRESS,
    },
  },
};

export const strategiesConfig: { [key: string]: StrategyConfig } = {
  [wstETHBooster_ADDRESS_STRATEGY_ID]: {
    name: "Boost wstETH",
    subTitle: "Increase ETH staking rewards automatically",
    description:
      "This Integrated Liquidity Market (ILM) uses wstETH deposits to borrow ETH, which is used to purchase more wstETH to achieve the targeted multiple.",
    address: wstETHBooster_ADDRESS_STRATEGY_ID as Address,
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
    underlyingAsset: assetsConfig[WSTETH_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
    faq: faqsData[wstETHBooster_ADDRESS_STRATEGY_ID],
    subStrategyData: [
      {
        address: wstETHBooster_ADDRESS,
        targetMultiple: {
          value: 3,
          symbol: "x",
        },
      },
    ],
    vaultsFyiLink: RouterConfig.Builder.vaults(wstETHBooster_ADDRESS),
  },
  [multiplyETH_ADDRESS_STRATEGY_ID]: {
    name: "Multiply ETH Long",
    subTitle: "Increase ETH price exposure",
    description:
      "This Integrated Liquidity Market (ILM) uses ETH deposits to borrow USDC, which is used to purchase more ETH to achieve the targeted multiple",
    address: multiplyETH_ADDRESS_STRATEGY_ID as Address,
    multiplier: "Up to 3x",
    faq: faqsData[multiplyETH_ADDRESS_STRATEGY_ID],
    logo: ilmEthUsdcLogo,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    subStrategyData: [
      {
        address: ethLong,
        targetMultiple: {
          value: 1.5,
          symbol: "x",
        },
      },
      {
        address: ethLong_3x,
        targetMultiple: {
          value: 3,
          symbol: "x",
        },
      },
    ],
  },
};

export const strategyConfigv2: { [key: string]: StrategyConfig } = {
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Leveraged Staking 3x",
    description: "Increase ETH staking rewards by magnifying a wstETH position.",
    address: wstETHBooster_ADDRESS,
    logo: wstETHIlm,
    underlyingAsset: assetsConfig[WSTETH_ADDRESS],
    debtAsset: assetsConfig[WETH_ADDRESS],
    tags: ["Staking"],
  },
  [ethLong]: {
    name: "ETH Long 1.5x",
    description: "For ETH Bulls, increase ETH price exposure by 1.5 times long.",
    address: ethLong,
    logo: ethLongIlm,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    tags: ["Long"],
  },
  [ethLong_3x]: {
    name: "ETH Long 3x",
    description: "For ETH Bulls, increase ETH price exposure by 3 times long.",
    address: ethLong_3x,
    logo: ethLongIlm,
    underlyingAsset: assetsConfig[WETH_ADDRESS],
    debtAsset: assetsConfig[USDC_ADDRESS],
    tags: ["Long"],
  },
};
