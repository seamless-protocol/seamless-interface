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
} from "@meta";
import { Asset, Strategy } from "../types/AssetTypes";
import ilmwstETHLogo from "@assets/tokens/ilmWstethEth.svg";
import ilmEthUsdcLogo from "@assets/tokens/ilmEthUsdc.svg";
import ethLogo from "@assets/tokens/eth.svg";
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
import { Address } from "viem";

export const assets: { [key: Address]: Asset } = {
  [WETH_ADDRESS]: {
    name: "Ethereum",
    address: WETH_ADDRESS,
    logo: ethLogo,
    sTokenAddress: sWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamWETH_ADDRESS,
    additionalData: {
      description: "Wrapped Ethereum (WETH) allows Ethereum to be traded & used directly in smart contracts.",
    },
  },
  [USDBC_ADDRESS]: {
    name: "USD Base Coin",
    address: USDBC_ADDRESS,
    logo: usdbcLogo,
    sTokenAddress: sUSDbC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDbC_ADDRESS,
    additionalData: {
      description:
        "USD Base Coin (USDbC) is a stablecoin pegged to the USD, providing a stable value for transactions.",
    },
  },
  [CBETH_ADDRESS]: {
    name: "Coinbase Wrapped Staked Ether",
    address: CBETH_ADDRESS,
    logo: cbethLogo,
    sTokenAddress: scbETH_ADDRESS,
    debtTokenAddress: variableDebtSeamcbETH_ADDRESS,
    additionalData: {
      description: "Coinbase ETH (cbETH) represents Ethereum staked through Coinbase, earning interest over time.",
    },
  },
  [USDC_ADDRESS]: {
    name: "USD Coin",
    address: USDC_ADDRESS,
    symbol: "USDC",
    logo: usdcLogo,
    sTokenAddress: sUSDC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDC_ADDRESS,
    additionalData: {
      description: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar.",
      isGauntletOptimized: true,
    },
  },
  [DAI_ADDRESS]: {
    name: "Dai",
    address: DAI_ADDRESS,
    logo: daiLogo,
    sTokenAddress: sDAI_ADDRESS,
    debtTokenAddress: variableDebtSeamDAI_ADDRESS,
    additionalData: {
      description: "Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar.",
    },
  },
  [WSTETH_ADDRESS]: {
    name: "Wrapped liquid Staked Ether 2.0",
    address: WSTETH_ADDRESS,
    logo: WstEthLogo,
    sTokenAddress: swstETH_ADDRESS,
    debtTokenAddress: variableDebtSeamwstETH_ADDRESS,
    additionalData: {
      description:
        "wstETH is a wrapped version of stETH. Due to the nature of Lido, the amount of stETH on your balance is not constant - it changes daily as staking rewards come in.",
    },
  },
  [DEGEN_ADDRESS]: {
    name: "Degen",
    address: DEGEN_ADDRESS,
    logo: degenLogo,
    sTokenAddress: sDEGEN_ADDRESS,
    debtTokenAddress: variableDebtSeamDEGEN_ADDRESS,
    additionalData: {
      useCoinGeckoPrice: true,
      description:
        "DEGEN is dubbed as the unofficial token created for the Farcaster community, a decentralized social network.",
    },
  },
  [SEAM_ADDRESS]: {
    name: "Seamless",
    address: SEAM_ADDRESS,
    logo: seamLogo,
    sTokenAddress: sSEAM_ADDRESS,
    debtTokenAddress: variableDebtSeamSEAM_ADDRESS,
    additionalData: {
      useCoinGeckoPrice: true,
      description: "SEAM is the fair launch utility governance token of Seamless Protocol.",
    },
  },
  [AERO_ADDRESS]: {
    name: "Aerodrome",
    address: AERO_ADDRESS,
    logo: aeroLogo,
    additionalData: {
      useCoinGeckoPrice: false,
      description: "AERO is a central trading and liquidity marketplace on Base.",
    },
  },
  [BRETT_ADDRESS]: {
    name: "Brett",
    symbol: "BRETT",
    address: BRETT_ADDRESS,
    logo: brettLogo,
    additionalData: {
      useCoinGeckoPrice: true,
      description: "BRETT is PEPE's best friend on Base.",
    },
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
};

// generated online, only FE id
export const wstETHBooster_ADDRESS_STRATEGY_ID = "0x0c4B148408fa99002477aD4cD7926Cf852F9DD27";
export const multiplyETH_ADDRESS_STRATEGY_ID = "0x8504d76bca9745EF54F927C95D8f1A427853F305";

export const strategies: { [key: Address]: Strategy } = {
  [wstETHBooster_ADDRESS_STRATEGY_ID]: {
    name: "wstETH Booster",
    address: wstETHBooster_ADDRESS_STRATEGY_ID,
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
    underlyingAsset: assets[WSTETH_ADDRESS],
    debtAsset: assets[WETH_ADDRESS],
    subStrategyData: [
      {
        address: wstETHBooster_ADDRESS,
        targetMultiple: {
          value: 3,
          symbol: "x",
        },
      },
    ],
    additionalData: {
      vaultsFyiLink: `https://www.vaults.fyi/vaults/base/${wstETHBooster_ADDRESS}?apyMode=30day`,
    },
  },
  [multiplyETH_ADDRESS_STRATEGY_ID]: {
    name: "Multiply ETH Long",
    address: multiplyETH_ADDRESS_STRATEGY_ID,
    logo: ilmEthUsdcLogo,
    underlyingAsset: assets[WETH_ADDRESS],
    debtAsset: assets[USDC_ADDRESS],
    subStrategyData: [
      {
        address: ethLong,
        targetMultiple: {
          value: 1.5,
          symbol: "x",
        },
      },
    ],
  },
};
