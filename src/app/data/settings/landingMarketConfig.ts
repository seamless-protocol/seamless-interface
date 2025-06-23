import {
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
  cbBTC_ADDRESS,
  STAKED_SEAM_ADDRESS,
} from "@meta";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import daiLogo from "@assets/tokens/dai.svg";
import seamLogo from "@assets/tokens/seam.svg";
import degenLogo from "@assets/tokens/degen.svg";
import aeroLogo from "@assets/tokens/aero.svg";
import brettLogo from "@assets/tokens/brett.svg";
import wethLogo from "@assets/tokens/weth.svg";
import cbBTCLogo from "@assets/tokens/cbBTC.svg";

import { Address } from "viem";
import { RouterConfig } from "../../router";
import { LendMarketConfig } from "./configTypes";

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
  [cbBTC_ADDRESS]: {
    name: "cbBTC",
    symbol: "cbBTC",
    address: cbBTC_ADDRESS,
    logo: cbBTCLogo,
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
  [STAKED_SEAM_ADDRESS]: {
    address: STAKED_SEAM_ADDRESS,
    useCoinGeckoPrice: true,
    coingGeckoConfig: {
      replaceAddress: SEAM_ADDRESS,
    },
  },
};

export const assetsConfigAsCoingGeckoPriceParams = Object.keys(assetsConfig)
  .filter((v) => !!assetsConfig[v as Address].useCoinGeckoPrice)
  .map((key) => ({
    address: assetsConfig[key as Address].address,
    precision: 8,
  }));
